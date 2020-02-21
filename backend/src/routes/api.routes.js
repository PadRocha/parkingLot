'use strict'

const router = require('express').Router(); //* Calls the Router of express


const userController = require('../controllers/user'); //* Calls the module controllers/user.js
const clienteController = require('../controllers/cliente'); //* Calls the module controllers/cliente.js
const loteController = require('../controllers/lote'); //* Calls the module controllers/lote.js
const cajonController = require('../controllers/cajon'); //* Calls the module controllers/cajon.js

const md_auth = require('../middlewares/auth');

/*------------------------------------------------------------------*/
// User routes
/*------------------------------------------------------------------*/

router.route('/')
    .get();

router.route('/register')
    .post(md_auth.authorized, userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/
// Cliente routes
/*------------------------------------------------------------------*/

router.route('/cliente')
    .get(md_auth.authorized, clienteController.listarCliente)
    .post(md_auth.authorized, clienteController.saveCliente);

router.route('/cliente/:id')
    .get(md_auth.authorized, clienteController.getCliente)
    .put(md_auth.authorized, clienteController.updateCliente)
    .delete(md_auth.authorized, clienteController.deleteCliente);

router.route('/cliente/:type/:param')
    .get(md_auth.authorized, clienteController.consultarCliente);

/*------------------------------------------------------------------*/
// Lote routes
/*------------------------------------------------------------------*/

router.route('/lote')
    .get(md_auth.authorized, loteController.listarLote)
    .post(md_auth.authorized, loteController.saveLote);

router.route('/lote/:id')
    .get(md_auth.authorized, loteController.getLote)
    .put(md_auth.authorized, loteController.updateLote)
    .delete(md_auth.authorized, loteController.deleteLote);

/*------------------------------------------------------------------*/
// Cajon routes
/*------------------------------------------------------------------*/

router.route('/cajon')
    .get(cajonController.listarCajon)
    .post(cajonController.saveCajon);

router.route('/cajon/:id')
    .get(cajonController.getCajon)
    .put(cajonController.updateCajon)
    .delete(cajonController.deleteCajon);

/*------------------------------------------------------------------*/

module.exports = router;