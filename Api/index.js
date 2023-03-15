const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path')
const public = path.join(__dirname,'../Client/public')

const {mongoose} = require('./database.js')


mongoose.set(`strictQuery`,false)
// mongoose.set(`strictQuery`,true)

//Settings

app.set('port', process.env.PORT || 3001)
const port = app.get('port')

//Middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

//Routes

app.use('/api',require('./routes/routes.js'))


//Static Files
app.use(express.static(path.join(__dirname,'../React/public'))) 
console.log(path.join(__dirname,'../Client/public'))

//Starting the server
app.listen(3000, () => {
    console.log(`server on port ${port}`)
    
})

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({message});
  });