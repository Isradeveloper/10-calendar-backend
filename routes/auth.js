/*
  Rutas de usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express')
// const router = express.Router
const router = Router()

const {loginUsuario, crearUsuario, revalidarToken} = require('../controllers/auth')

router.post('/register', crearUsuario);

router.post('/', loginUsuario);

router.get('/renew', revalidarToken);


module.exports = router

