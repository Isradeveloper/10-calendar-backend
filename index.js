
const express = require('express')
const { dbConnection } = require('./database/config')
const dotenv = require('dotenv').config()

// console.log(process.env)  // VER VARIABLES DE ENTORNO

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

// Directorio publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))    // TODO: auth // crear, login, renew
// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen(process.env.PORT, ()=>{
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})