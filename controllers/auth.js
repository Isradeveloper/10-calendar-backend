const express = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const loginUsuario = async (req, res = express.response) => {

  const { email, password } = req.body

  try {

    const usuario = await Usuario.findOne({email}) // Trae usuario de la base de datos

    // console.log(usuario)

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con este email'
      })
    }

    // Confirmar passwords
    const validPassword = bcrypt.compareSync(password, usuario.password) // Compara la password del request con la del user en BD

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      email: usuario.email,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error, por favor hable con el administrador'
    })
  }

}

const crearUsuario = async (req, res = express.response) => {

  const { name, email, password } = req.body


  try {

    let usuario = await Usuario.findOne({ email }) // email: email
    // console.log(usuario) Si usuario no existe retorna null

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya se encuentra un usuario con este correo'
      })
    }

    usuario = new Usuario(req.body)

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)


    await usuario.save()

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)


    res.status(201).json({
      ok: true,
      // msg: 'registro',
      uid: usuario.id,
      name: usuario.name,
      email: usuario.email,
      token
      // password: usuario.password,
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error, por favor hable con el administrador'
    })
  }

}

const revalidarToken = async (req, res = express.response) => {

  const {uid, name} = req

  const nuevoToken = await generarJWT(uid, name)


  res.json({
    ok: true,
    token: nuevoToken
  })

}

module.exports = {
  loginUsuario,
  crearUsuario,
  revalidarToken
}