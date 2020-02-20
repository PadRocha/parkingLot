'use strict'

const router = require('express').Router(); //* Calls the Router of express

const userController = require('../controllers/user'); //* Calls the module controllers/user.js

const md_auth = require('../middlewares/auth');

router.route('/')
    .get();

router.route('/register')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

/*------------------------------------------------------------------*/

module.exports = router;