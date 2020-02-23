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
    .post(mdAuth.authAdmin, userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/
// Cliente routes
/*------------------------------------------------------------------*/

router.route('/cliente')
    .get(clienteController.listarCliente)
    .post(clienteController.saveCliente);

router.route('/cliente/:id')
    .get(clienteController.getCliente)
    .put(clienteController.updateCliente)
    .delete(clienteController.deleteCliente);

router.route('/cliente/:type/:param')
    .get(clienteController.consultarCliente);

/*------------------------------------------------------------------*/
// Lote routes
/*------------------------------------------------------------------*/

router.route('/lote')
    .get(loteController.listarLote)
    .post(loteController.saveLote);

router.route('/lote/:id')
    .get(loteController.getLote)
    .put(loteController.updateLote)
    .delete(loteController.deleteLote);

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