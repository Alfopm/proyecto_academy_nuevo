const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./Routes/index')
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://alfonsina:lZILosaNmB7niK9G@cluster0.grtfp.mongodb.net/academy_alfonsina?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//habilitar routing
app.use('/', routes())


//se inicia el servidor
app.listen(8080, (err)=>{
    if (err) console.error("No se pudo conectar el servidor ", err.message);
    console.log("server listening on port 8080");
})