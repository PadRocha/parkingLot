'use Strict'

/*------------------------------------------------------------------*/
// Modelo de registro.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const registroSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
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