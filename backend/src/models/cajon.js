'use strict'

/*------------------------------------------------------------------*/
// Modelo de cajon.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const cajonSchema = new Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    lote: {
        type: Schema.Types.ObjectId,
        ref: 'Lote',
        required: true
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Cajon', cajonSchema);