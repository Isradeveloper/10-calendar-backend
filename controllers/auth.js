const express = require('express')

const loginUsuario = (req, res) => {

  res.json({
    ok: true,
    msg: 'login'
  })

}

const crearUsuario = (req, res = express.response)=>{

  res.json({
    ok: true,
    msg: 'registro'
  })
}

const revalidarToken = (req, res)=>{

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