'use Strict'

/*------------------------------------------------------------------*/
// Modelo de subscripcion.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const subscripcionSchema = new Schema({
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
    cajon: {
        type: Schema.Types.ObjectId,
        ref: 'Cajon'
    }
}, {
    timestamps: true
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Subscripcion', subscripcionSchema);