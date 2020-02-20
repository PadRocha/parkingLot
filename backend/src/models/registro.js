'use Strict'

/*------------------------------------------------------------------*/
// Modelo de registro.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const registroSchema = new Schema({
    ingreso: {
        type: Date,
        default: Date.now
    },
    salida: {
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
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Registro', registroSchema);