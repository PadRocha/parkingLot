'use Strict'

/*------------------------------------------------------------------*/
// Modelo de cliente.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    license: {
        type: String,
        required: true
    },
    image: String,
    avales: [String]
}, {
    timestamps: true
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Cliente', clienteSchema);