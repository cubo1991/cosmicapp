const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path')
const public = path.join(__dirname,'../Client/public')

const {mongoose} = require('./database.js')
mongoose.set(`strictQuery`,false)
// mongoose.set(`strictQuery`,true)

//Settings

app.set('port', process.env.PORT || 3000)
const port = app.get('port')

//Middlewares

app.use(morgan('dev'))
app.use(express.json())

//Routes

app.use('/api',require('./routes/routes.js'))


//Static Files
app.use(express.static(path.join(__dirname,'../Client/public'))) 
console.log(path.join(__dirname,'../Client/public'))

//Starting the server
app.listen(3000, () => {
    console.log(`server on port ${port}`)
    
})