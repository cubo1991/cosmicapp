const express = require('express');
const router = express.Router();

const {Jugador, Copa, Partida} = require('../models/models.js')




// GET
router.get('/jugadores', async (req, res, next) => {
  try {
    const jugadores = await Jugador.find();
    console.log(jugadores)
    res.json(jugadores);
  } catch (err) {
    next(err);
  }
});

router.get('/ranking', async (req, res, next) => {
  try {
    const jugadores = await Jugador.find({}, "puntosPartidas nombre");
    
    const jugadoresMap = jugadores.map(jugador => ({
      nombre: jugador.nombre,
      _id: jugador._id,
      puntosPartidas: jugador.puntosPartidas.slice(0, 10).reduce((a, b) => a + b, 0)
    }));
 let jugadoresOrdenados = (jugadoresMap.sort((a, b) => b.puntosPartidas - a.puntosPartidas))
    res.json(jugadoresOrdenados);
  } catch (err) {
    next(err);
  }
});

router.get('/:idCopa', async (req, res, next) => {
  try {
    const { idCopa } = req.params;
    console.log(idCopa);

    const copa = await Copa.findById(idCopa);

    res.json(copa);
  } catch (err) {
    next(err);
  }
});

router.get('/jugador/:id', async (req, res, next) => {
  try {
    const jugadores = await Jugador.findById(req.params.id);
    res.json(jugadores);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/', async (req, res, next) => {
  try {
    const { nombre, color, puntos, copas, campañas, ranking } = req.body;
    const jugador = new Jugador({ nombre, color, puntos, copas, campañas, ranking });
    await jugador.save();

    res.json({ status: "Jugador creado" });
  } catch (err) {
    next(err);
  }
});

router.post('/copa', async (req, res, next) => {
  try {
    const { _id, nombre, cantidadPartidas } = req.body;
    const copa = new Copa({ nombre: nombre, cantidadPartidas, jugadores: [] });
    const newCopa = await copa.save();

    res.status(201).json({
      success: true,
      copa: newCopa
    });
  } catch (err) {
    next(err);
  }
});

router.post('/copa/:id', async (req, res, next) => {
  try {
    const { _id } = req.body;
    await Copa.findOne({ _id: _id }).populate('jugadores');
    res.json({ status: "Jugadores agregados" });
  } catch (err) {
    next(err);
  }
});

router.post('/partida', async (req, res) => {
  try {
    const { fecha, jugadoresPresentes, campaña } = req.body;
    console.log(fecha);

    const nuevaPartida = new Partida({ fecha, jugadoresPresentes, campaña });
    const partidaGuardada = await nuevaPartida.save();

    res.json(partidaGuardada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

 
// PUT

router.put('/jugador/:idJugador', async (req, res, next) => {
  try {
    const { idJugador } = req.params;
    const camposActualizados = req.body;
    delete camposActualizados._id; // Opcional: eliminar el campo _id para evitar un error al actualizar
    const jugadorActualizado = await Jugador.findByIdAndUpdate(idJugador, { $set: camposActualizados }, { new: true });

    if (!jugadorActualizado) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    res.status(200).json(jugadorActualizado);
  } catch (error) {
    next(error);
  }
})


router.put('/:idPartida', async (req, res) => {
  try {
    const { idPartida } = req.params;
    const { jugadoresPresentes } = req.body;

    const partida = await Partida.findById(idPartida);

    if (!partida) {
      return res.status(404).json({ error: 'Partida no encontrada' });
    }

    partida.jugadoresPresentes = jugadoresPresentes.map((jp) => {
      return {
        jugador: jp.jugador,
        posicion: jp.posicion
      }
    });

    await partida.save();

    res.json(partida);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
 
router.put("/copa/:id/agregarJugador", async (req, res) => {
  try {
    const {jugadoresId} = req.body
    const copaId = req.params.id;

    // Verificar si al menos un ID de jugador está repetido
    const jugadoresDuplicados = new Set(jugadoresId).size !== jugadoresId.length;
    if (jugadoresDuplicados) {
      console.log("Se ha encontrado un jugador repetido")
      return res.status(400).send("Se ha encontrado un jugador repetido");
    }

    // Buscar la copa en la base de datos y agregar los jugadores al arreglo "jugadores"
    const copa = await Copa.findByIdAndUpdate(copaId, {
      $addToSet: { jugadores: { $each: jugadoresId } }
    });

    // Buscar al jugador en la base de datos y agregarle la copa
    for (player of jugadoresId) {
      await Jugador.findByIdAndUpdate(
        {_id: player},
        {
          $push:{
            copasJugadas: {copa: copaId, puntos: 0}, $position: 0
          } 
        }
      )
    }

    if (!copa) return res.status(404).send("Copa no encontrada");

    // Devolver la copa actualizada
    res.send(copa);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:idCopa/:idJugador', async (req, res) => {
  // if (Object.values(req.body).length === 1 && puntosPartidas) {
  //         await Jugador.updateOne({ _id: req.params.id }, { $push: { puntosPartidas: { $each: puntosPartidas, $position: 0 } } });
  //         res.json({ status: "Puntaje asignado" });
  //         return;
  //       }
  try {
    const { idJugador, idCopa } = req.params;
    const { puntosPartidas } = req.body;

    const jugador = await Jugador.findById(idJugador);

    if (!jugador) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }
    jugador.puntosPartidas.unshift(puntosPartidas[0]);
    const copa = jugador.copasJugadas.find((c) => c.copa.equals(idCopa));

    if (!copa) {
      return res.status(404).json({ error: 'Copa no encontrada para este jugador' });
    }

    copa.puntos.push(puntosPartidas[0]);

    await jugador.save();

    res.json(jugador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});



// router.put('/jugador/:id', async (req, res, next) => {
//   try {
//     const { nombre, color, puntos, copas, campañas, ranking, partidas, puntosPartidas } = req.body;

//     if (Object.values(req.body).length === 1 && puntosPartidas) {
//       await Jugador.updateOne({ _id: req.params.id }, { $push: { puntosPartidas: { $each: puntosPartidas, $position: 0 } } });
//       res.json({ status: "Puntaje asignado" });
//       return;
//     }

//     const nuevoJugador = { nombre, color, puntos, copas, campañas, ranking, partidas, puntosPartidas };
//     await Jugador.findByIdAndUpdate(req.params.id, nuevoJugador);
//     res.json({ status: "Jugador modificado" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error del servidor' });
//   }
// });

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    await Jugador.findByIdAndRemove(req.params.id);
    res.json({ status: "Jugador eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


module.exports = router