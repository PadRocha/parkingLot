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
        unique: true
    },
    ocupated: Boolean
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Lote', loteSchema);