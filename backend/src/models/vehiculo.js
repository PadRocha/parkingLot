'use Strict'

/*------------------------------------------------------------------*/
// Modelo de vehiculo.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const vehiculoSchema = new Schema({
    matricula: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    tipo: {
        type: String,
        trim: true
    },
    modelo: {
        type: String,
        trim: true
    },
    color: String,
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    cajon: {
        type: Schema.Types.ObjectId,
        ref: 'Cajon'
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Vehiculo', vehiculoSchema);