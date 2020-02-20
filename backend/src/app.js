'use strict'

const express = require('express'); //* Calls express
const cors = require('cors'); //* Calls cors
const jwt = require('jsonwebtoken'); //* Calls jwt

const app = express();

/*------------------------------------------------------------------*/
// Settings
/*------------------------------------------------------------------*/

app.set('port', process.env.PORT || 4000);

/*------------------------------------------------------------------*/
// Middlewares
/*------------------------------------------------------------------*/

app.use(cors());
app.use(express.json());

/*------------------------------------------------------------------*/
// Routes
/*------------------------------------------------------------------*/

app.use('/api', require('./routes/api.routes'));

/*------------------------------------------------------------------*/

module.exports = app;