'use strict'

const router = require('express').Router(); //* Calls the Router of express


const userController = require('../controllers/user'); //* Calls the module controllers/user.js
const clienteController = require('../controllers/cliente'); //* Calls the module controllers/cliente.js
const loteController = require('../controllers/lote'); //* Calls the module controllers/lote.js
const cajonController = require('../controllers/cajon'); //* Calls the module controllers/cajon.js
const vehiculoController = require('../controllers/vehiculo'); //* Calls the module controllers/vehiculo.js
const registroController = require('../controllers/registro'); //* Calls the module controllers/registro.js
const subscripcionController = require('../controllers/subscripcion'); //* Calls the module controllers/subscripcion.js

const mdAuth = require('../middlewares/auth'); //* Calls Security

/*------------------------------------------------------------------*/
// User routes
/*------------------------------------------------------------------*/

router.route('/')
    .get();

router.route('/register')
    .post(mdAuth.authorized, userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/
// Cliente routes
/*------------------------------------------------------------------*/

router.route('/cliente')
    .get(mdAuth.authorized, clienteController.listarCliente)
    .post(clienteController.saveCliente);

router.route('/cliente/:id')
    .get(mdAuth.authorized, clienteController.getCliente)
    .put(mdAuth.authorized, clienteController.updateCliente)
    .delete(mdAuth.authorized, clienteController.deleteCliente);

router.route('/cliente/:type/:param')
    .get(mdAuth.authorized, clienteController.consultarCliente);

/*------------------------------------------------------------------*/
// Lote routes
/*------------------------------------------------------------------*/

router.route('/lote')
    .get(mdAuth.authorized, loteController.listarLote)
    .post(mdAuth.authorized, loteController.saveLote);

router.route('/lote/:id')
    .get(mdAuth.authorized, loteController.getLote)
    .put(mdAuth.authorized, loteController.updateLote)
    .delete(mdAuth.authorized, loteController.deleteLote);

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
// Vehiculo routes
/*------------------------------------------------------------------*/

router.route('/vehiculo')
    .get(vehiculoController.listarVehiculo)
    .post(vehiculoController.saveVehiculo);

router.route('/vehiculo/:id')
    .get(vehiculoController.getVehiculo)
    .put(vehiculoController.updateVehiculo)
    .delete(vehiculoController.deleteVehiculo);

/*------------------------------------------------------------------*/
// Registro routes
/*------------------------------------------------------------------*/

router.route('/registro')
    .get(registroController.listarRegistro)
    .post(registroController.saveRegistro);

router.route('/registro/:id')
    .get(registroController.getRegistro)
    .put(registroController.updateRegistro)
    .delete(registroController.deleteRegistro);

/*------------------------------------------------------------------*/
// Subscripcion routes
/*------------------------------------------------------------------*/

router.route('/subscripcion')
    .get(subscripcionController.listarSubscripcion)
    .post(subscripcionController.saveSubscripcion);

router.route('/subscripcion/:id')
    .get(subscripcionController.getSubscripcion)
    .put(subscripcionController.updateSubscripcion)
    .delete(subscripcionController.deleteSubscripcion);

/*------------------------------------------------------------------*/

module.exports = router;