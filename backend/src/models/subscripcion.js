'use strict'

/*------------------------------------------------------------------*/
// Modelo de subscripcion.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const subscripcionSchema = new Schema({
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
    cajon: {
        type: Schema.Types.ObjectId,
        ref: 'Cajon'
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

module.exports = mongoose.model('Subscripcion', subscripcionSchema);