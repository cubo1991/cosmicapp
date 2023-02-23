const express = require('express');
const router = express.Router();

const {Jugador, Copa, Partida} = require('../models/models.js')




// GET

router.get('/', async (req, res, next) => {

   const jugadores = await Jugador.find();
   console.log(jugadores)
   res.json(jugadores)    
    

})

router.get('/ranking', async (req, res, next) => {

   const jugadores = await Jugador.find({}, "puntosPartidas nombre");
   const jugadoresMap = jugadores.map( jugador => (
      {  
         nombre: jugador.nombre,
         _id: jugador._id,
         puntosPartidas: jugador.puntosPartidas.slice(0,10).reduce((a,b) => a+b, 0)
      }
   ));   
   res.json(jugadoresMap)    
    

})

router.get('/:idCopa', async (req, res, next) => {
  const {idCopa} = req.params
  console.log(idCopa)

  const copa = await Copa.findById(idCopa)

  res.json(copa)    
   

})

router.get('/:id', async (req, res, next) => {

    const jugadores = await Jugador.findById(req.params.id);
     res.json(jugadores)    
     
 
 })
// POST

router.post('/', async (req, res, next) => {
    const {nombre, color, puntos, copas, campañas, ranking} = req.body
    const jugador = new Jugador({nombre, color, puntos, copas, campañas, ranking})
    await jugador.save()
    
  res.json({status: "Jugador creado"})   
     
 
 })

 router.post('/copa', async (req, res, next) => {
   const {_id, nombre, cantidadPartidas} = req.body
   const copa = new Copa({nombre: nombre, cantidadPartidas, jugadores: []})
   try {
      const newCopa = await copa.save();
      res.status(201).json({
        success: true,
        copa: newCopa
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  });
    
router.post('/copa/:id', async (req, res, next) => {
  const {_id} = req.body
await Copa.findOne({ _id: _id }).populate('jugadores')
res.json({status: "Jugadores agregados"})   
   

})

router.post('/partida', async (req, res) => {
  const { fecha, jugadoresPresentes, campaña } = req.body;
console.log(fecha)
  try {
    // Creamos la nueva partida
    const nuevaPartida = new Partida({ fecha, jugadoresPresentes, campaña });

    // Guardamos la partida en la base de datos
    const partidaGuardada = await nuevaPartida.save();

    // Respondemos con la partida creada
    res.json(partidaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

 
// PUT


router.put('/:idPartida', async (req, res) => {
  const { idPartida } = req.params;
  const { jugadoresPresentes } = req.body;

  try {
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
  const {jugadoresId} = req.body
  const copaId = req.params.id;
  
     try {
  
  
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

   // ESTO NO FUNCIONA TENGO QUE ARREGLARLO

   router.put('/:idCopa/:idJugador', async (req, res) => {
    const { idJugador, idCopa } = req.params;
    const { puntos } = req.body;
    console.log(puntos)
  
    try {
      const jugador = await Jugador.findById(idJugador);
  
      if (!jugador) {
        return res.status(404).json({ error: 'Jugador no encontrado' });
      }
  
      const copa = jugador.copasJugadas.find((c) => c.copa.equals(idCopa));
  
      if (!copa) {
        return res.status(404).json({ error: 'Copa no encontrada para este jugador' });
      }
  
      copa.puntos.push(puntos);
  
      await jugador.save();
  
      res.json(jugador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });



 router.put('/:id', async (req, res, next) =>{
    const {nombre, color, puntos, copas, campañas, ranking, partidas, puntosPartidas} = req.body

   if(Object.values(req.body).length === 1 && puntosPartidas){
     
     await Jugador.updateOne({_id: req.params.id },  {$push: {puntosPartidas: {$each: puntosPartidas, $position: 0}} } )
     res.json({status: "Puntaje asignado"})
      
     return
     
   }
    const nuevoJugador = {nombre, color, puntos, copas, campañas, ranking, partidas, puntosPartidas}
    await Jugador.findByIdAndUpdate(req.params.id, nuevoJugador, )
   
    res.json({status: "Jugador modificado"})

 })


 //DELETE
 router.delete('/:id', async (req, res, next) =>{

    await Jugador.findByIdAndRemove(req.params.id)
   
    res.json({status: "Jugador eliminado"})

 })


module.exports = router