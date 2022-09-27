/*
  Rutas de usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express')
// const router = express.Router
const { check } = require('express-validator')
const router = Router()

const { loginUsuario, crearUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')


router.post(
  '/register',
  [ // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener más de 6 carácteres').isLength({ min: 6 }),
    validarCampos
  ],
  crearUsuario
);

router.post(
  '/',
  [
    // middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña tener más de 6 carácteres').isLength(6),
    validarCampos
  ],
  loginUsuario
);

router.get('/renew', validarJWT , revalidarToken);


module.exports = router

