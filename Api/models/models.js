const mongoose = require('mongoose');
const {Schema} = mongoose;




const schemaJugador = new Schema ({
    nombre:{ type: String, required: true},
    color:{type: String, required: true},
    puntos:{type: Number, default: 0},
    copas:{type: Number, default: 0},
    campañas:{type: Number, default: 0},
    ranking:{type: Number, default: 1},
    partidas:{type:Number},
    puntosPartidas:[Number],
    colonias:{type:Number},
    victorias: {type:Number},
    victoriasEspeciales: {type:Number},
    ataqueSolitario: {type:Number},
    defensaSolitaria: {type:Number},
    foto: {type: String},
    cumpleaños:{type:Date},
    biografia:{type: String},
    partidasDeCopa:[{
        type: Number,
        
    }],
    copasJugadas:[{
      copa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'copa'
      },
      partidas: [{
        coloniasExternas: {type:Number},
        coloniasInternas: {type:Number},
        puntosPartida: {type:Number}
      }],
      puntos: [{
         type:Number, required: true      
      }]
  }],
})

const schemaPartida = new Schema({
fecha: {type: Date},
jugadoresPresentes: [{
  jugador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jugadores'
  },
  posicion: {
    type: Number
  }
}],
campaña: {type:Boolean},


})

const schemaAdmin = new Schema({
  nombre: {type: String},
  contraseña: {type: String},
  totalPublicaciones:{type: Number},
  rangoactual:{type: Number}

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
const Admin = mongoose.model('admin',schemaAdmin);
const Partida = mongoose.model('partida', schemaPartida)

module.exports =  {Jugador, Copa, Admin, Partida}
