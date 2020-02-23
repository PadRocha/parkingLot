'use strict'

/*------------------------------------------------------------------*/
// Modelo de subscripcion.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const subscripcionSchema = new Schema({
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    cajon: {
        type: Schema.Types.ObjectId,
        ref: 'Cajon',
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Subscripcion', subscripcionSchema);