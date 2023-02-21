const mongoose = require('mongoose');


const URI = 'mongodb://127.0.0.1/cosmicapp'
mongoose.set('strictQuery', false);
mongoose.connect(URI)
.then(db =>console.log("DB is connect"))
.catch(err => console.log(err))


module.exports= mongoose