const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Crear el servidor/aplicacion de express
const app = express();

//Ejecutar la base de datos
dbConnection();

//Directorio public
app.use( express.static('public') );

//CORS
app.use( cors() );

//lectura y parseo del body
app.use(express.json());

//Rutass
app.use('/api/auth', require('./routes/auth'));

//Manejo de rutas no controladas
app.get('*', (req, res)=>{
	res.sendFile( path.resolve( __dirname, 'public/index.html' ) )
})


app.listen( process.env.PORT, ()=> {
	console.log(`Servidor corriendo en puerto ${ 4000 }`);	
})