'use strict'

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
        lowercase: true,
        unique: true
    },
    license: {
        type: String,
        required: true
    },
    typeLicense: {
        type: String,
        default: 'conducir'
    },
    image: String,
    avales: {
        type: [String],
        validate: (val) => {
            return val.length <= 3;
        }
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

clienteSchema.static('findByName', function (name, next) {
    return this.find({ name: new RegExp(name, 'i') }, next);
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Cliente', clienteSchema);