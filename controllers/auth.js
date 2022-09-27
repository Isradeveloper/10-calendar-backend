const express = require('express')

const loginUsuario = (req, res = express.response) => {

  const { email, password } = req.body

  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  })

}

const crearUsuario = (req, res = express.response)=>{

  const { name, email, password } = req.body

  
  if (name.length < 5){
    return res.status(400).json({
      ok: false,
      msg: 'El nombre debe tener más de 5 carácteres'
    })
  }

  res.status(201).json({
    ok: true,
    msg: 'registro',
    name,
    email,
    password,
  })
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