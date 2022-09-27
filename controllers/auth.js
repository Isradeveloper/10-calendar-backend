const express = require('express')
const Usuario = require('../models/Usuario')

const loginUsuario = (req, res = express.response) => {

  const { email, password } = req.body

  res.status(201).json({
    ok: true,
    msg: 'login',
    email,
    password
  })

}

const crearUsuario = async (req, res = express.response)=>{

  // const { name, email, password } = req.body

  const usuario = new Usuario(req.body)

  try {

    await usuario.save()
    
    res.status(201).json({
      ok: true,
      msg: 'registro',
      // name,
      // email,
      // password,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error, por favor hable con el administrador'
    })
  }
  
}

const revalidarToken = (req, res = express.response)=>{

  res.json({
    ok: true,
    msg: 'renew'
  })

}

module.exports = {
  loginUsuario,
  crearUsuario,
  revalidarToken
}