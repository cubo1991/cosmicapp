const express = require('express');
const router = express.Router();

const {Jugador, Copa, Partida} = require('../models/models.js')




// GET
router.get('/jugadores', async (req, res, next) => {
  try {
    const jugadores = await Jugador.find();
   
    res.json(jugadores);
  } catch (err) {
    next(err);
  }
});

router.get('/ranking', async (req, res, next) => {
  try {
    const jugadores = await Jugador.find({}, "puntosPartidas nombre podioCopa");

    const jugadoresMap = jugadores.map(jugador => {
      let puntosPartidas = jugador.puntosPartidas.slice(0, 10).reduce((a, b) => a + b, 0);
      
    
        if(jugador.podioCopa.primerPuesto === true) puntosPartidas += 10;
        else if(jugador.podioCopa.segundoPuesto === true) puntosPartidas += 7;
        else if(jugador.podioCopa.tercerPuesto === true) puntosPartidas += 5;
      

      return {
        nombre: jugador.nombre,
        _id: jugador._id,
        puntosPartidas: puntosPartidas
      };
    });

    const jugadoresOrdenados = jugadoresMap.sort((a, b) => b.puntosPartidas - a.puntosPartidas);
    
    res.json(jugadoresOrdenados);
  } catch (err) {
    next(err);
  }
});




router.get('/copa', async (req, res, next) => {
  try {
    const copas = await Copa.find();
  
    res.json(copas);
  } catch (err) {
    next(err);
  }
});

router.get('/:idCopa', async (req, res, next) => {
  try {
    const { idCopa } = req.params;


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
router.post('/jugador', async (req, res, next) => {
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
    const { nombre, cantidadPartidas } = req.body;
    const copa = new Copa({ nombre: nombre, cantidadPartidas, jugadores: []});
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
   

    const nuevaPartida = new Partida({ fecha, jugadoresPresentes, campaña });
    const partidaGuardada = await nuevaPartida.save();

    res.json(partidaGuardada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

 
// PUT
router.put('/setPodio', async (req,res) => {
  console.log(req.body[0])

try{
 await Jugador.updateMany({}, {
    $set: {
      'podioCopa.primerPuesto': false,
      'podioCopa.segundoPuesto': false,
      'podioCopa.tercerPuesto': false
    }})

    await Jugador.updateOne({_id: req.body[0].ID},{$set:{'podioCopa.primerPuesto': true}} );
    await Jugador.updateOne({_id: req.body[1].ID},{$set:{'podioCopa.segundoPuesto': true}} );
    await Jugador.updateOne({_id: req.body[2].ID},{$set:{'podioCopa.tercerPuesto': true}} );
} catch(err){
  console.error(err);
  res.status(500).json({ error: 'Error del servidor' });
}


  res.status(200).json("TodoOk");

})
  router.put('/puntuacionJugador', async (req, res) => {
    const { jugadores, idCopa } = req.body;
      console.log(req.body)
    try {
      
      const puntajesPartidas = [];
      await Copa.updateOne({_id: idCopa},{$inc:{partidasJugadas: 1}} )

      for (const jugadorInfo of jugadores) {
        const { idJugador, coloniasInternas, coloniasExternas, puntosVictoria, victoriasEspeciales, ataqueSolitario, defensaSolitaria, noJugo } = jugadorInfo;
        if(noJugo === false)
        {

          let puntajePartida = coloniasInternas + coloniasExternas * 2 + puntosVictoria;
          puntajesPartidas.push(puntajePartida);
          await Jugador.updateOne({ _id: idJugador }, { $inc: { colonias: coloniasExternas } });
          await Jugador.updateOne({ _id: idJugador }, { $inc: { partidas: 1 } });
          if (puntosVictoria) {
            await Jugador.updateOne({ _id: idJugador }, { $inc: { victorias: 1 } });
          }
          if (victoriasEspeciales) {
            await Jugador.updateOne({ _id: idJugador }, { $inc: { victoriasEspeciales: 1 } });
          }
          if (ataqueSolitario) {
            await Jugador.updateOne({ _id: idJugador }, { $set: { ataqueSolitario } });
          }
          if (defensaSolitaria) {
            await Jugador.updateOne({ _id: idJugador }, { $set: { defensaSolitaria } });
          }
  
          const jugador = await Jugador.findById(idJugador);
  
          if (!jugador) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
          }
          jugador.puntosPartidas.unshift(puntajePartida);
          const copa = jugador.copasJugadas.find((c) => c.copa.equals(idCopa));
  
          if (!copa) {
            return res.status(404).json({ error: 'Copa no encontrada para este jugador' });
          }
  
          copa.puntos.push(puntajePartida);
  
          await jugador.save();
        }

      }

      res.json(puntajesPartidas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

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
 
router.put("/copa/id/agregarJugador", async (req, res) => {
  try {
    const {jugadoresId, copaId} = req.body

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
            copasJugadas: {copa: copaId}, $position: 0
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


router.delete('/jugadores', async (req, res) => {
  try {
    await Jugador.deleteMany({});
    console.log("Se han eliminado todos los documentos de la colección 'jugadores'.");
    res.status(200).json({ message: 'Se eliminaron todos los jugadores.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar los jugadores.' });
  }
});
router.delete('/copa', async (req, res) => {
  try {
    await Copa.deleteMany({});
    await Jugador.updateMany({}, {$set: {copasJugadas: []}});
    console.log("Se han eliminado todos los documentos de la colección 'copa'.");
    res.status(200).json({ message: 'Se eliminaron todos los copas.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar los copas.' });
  }
});
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