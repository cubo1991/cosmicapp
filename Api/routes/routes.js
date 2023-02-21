const express = require('express');
const router = express.Router();

const {Jugador, Copa} = require('../models/models.js')




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


 
// PUT


// ESTO NO FUNCIONA TENGO QUE ARREGLARLO
 
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


router.put('/:idCup/:idPlayer', async (req, res) => {
  const {idCup, idPlayer} = req.params;
  const {points} = req.body;
  try {
    const cup = await Copa.findById(idCup);
    const player = await Jugador.findById(idPlayer);



    const playerInCup = cup.jugadores.find(j => j._id.toString() === idPlayer);
    const index = cup.jugadores.indexOf(playerInCup);

console.log(playerInCup, index)

    const copaJugada = player.copasJugadas.find(c => c.copa.toString() === idCup);
    copaJugada.puntos.push({type: points});

    const updatedCup = await cup.save();
    const updatedPlayer = await player.save();

    res.json({"message":"Funciona"});
  } catch (error) {
    res.status(400).json({message: error.message});
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