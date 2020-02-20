'use Strict'

/*------------------------------------------------------------------*/
// Modelo de cajon.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const Schema = mongoose.Schema;

const cajonSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    available: Boolean,
    lote: {
        type: Schema.Types.ObjectId,
        ref: 'Lote'
    }
});

/*------------------------------------------------------------------*/

module.exports = mongoose.model('Cajon', cajonSchema);