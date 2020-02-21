'use Strict'

/*------------------------------------------------------------------*/
// Modelo de lote.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const loteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Lote', loteSchema);