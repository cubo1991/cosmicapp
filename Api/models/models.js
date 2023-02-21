const mongoose = require('mongoose');
const {Schema} = mongoose;

function arrayLimit(val) {
  return val.length <= 10;
}
function maxPartidas(val) {
  return val <= 10
}


const schemaJugador = new Schema ({
    nombre:{ type: String, required: true},
    color:{type: String, required: true},
    puntos:{type: Number, default: 0},
    copas:{type: Number, default: 0},
    campañas:{type: Number, default: 0},
    ranking:{type: Number, default: 1, required: true},
    partidas:{type:Number},
    puntosPartidas:[Number],
    colonias:{type:Number},
    victorias: {type:Number},
    victoriasEspeciales: {type:Number},
    ataqueSolitario: {type:Number},
    defensaSolitaria: {type:Number},
    partidasDeCopa:[{
        type: Number,
        validate: [arrayLimit, 'El número máximo de partidas permitido es 10']
    }],
    copasJugadas:[{
      copa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'copa'
      },
      puntos: [{
        type:{ type:Number, required: true}       
      }]
  }],
})


const schemaCopa = new Schema({
 nombre:{type:String, required: true},
cantidadPartidas:{
  type: Number,
 
},
 jugadores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jugadores'
  }],



}, {timestamps: true})

const Jugador = mongoose.model('jugadores', schemaJugador);
const Copa = mongoose.model('copa', schemaCopa);

module.exports =  {Jugador, Copa}
