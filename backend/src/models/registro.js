'use strict'

/*------------------------------------------------------------------*/
// Modelo de registro.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const registroSchema = new Schema({
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Registro', registroSchema);