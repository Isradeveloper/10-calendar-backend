const express = require('express')
const {validationResult} = require('express-validator')

const loginUsuario = (req, res = express.response) => {

  const { email, password } = req.body
  const errores = validationResult(req)

  if (!errores.isEmpty()){
    return res.status(400).json({
      ok: false,
      errores: errores.mapped()
    })
  }

  res.status(201).json({
    ok: true,
    msg: 'login',
    email,
    password
  })

}

const crearUsuario = (req, res = express.response)=>{

  const { name, email, password } = req.body

  // Manejo de errores
  const errores = validationResult(req)
  // console.log(errores)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errores.mapped()
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