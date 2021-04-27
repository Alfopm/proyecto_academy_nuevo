const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://alfonsina:lZILosaNmB7niK9G@cluster0.grtfp.mongodb.net/academy_alfonsina?retryWrites=true&w=majority';

const client = new MongoClient(url);

module.exports = client;


// Conexión desde un cliente como Compass o Robot3t
// mongodb+srv://<username>:<password>@cluster0.grtfp.mongodb.net/academy_alfonsina

// Datos
// Servidor = cluster0.grtfp.mongodb.net
// Base de datos = academy_alfonsina
// Usuario = alfonsina
// Contraseña = lZILosaNmB7niK9G
// Roles = dbAdmin, readWrite
// Colecciones = authors, articles