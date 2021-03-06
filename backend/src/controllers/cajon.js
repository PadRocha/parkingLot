'use strict'

/*------------------------------------------------------------------*/
// Controlador de cajon.js
/*------------------------------------------------------------------*/

const Cajon = require('../models/cajon'); //* Calls cajon.js model

const cajonController = {
    saveCajon(req, res) {
        const newCajon = new Cajon(req.body);
        newCajon.save((err, cajonStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cajonStored) return res.status(204).send({ error: 'Cajon No Content' });
            return res.status(200).send({ data: cajonStored });
        });
    },
    listarCajon(req, res) {
        Cajon.find({}).populate({ path: 'lote' }).sort('number').exec((err, cajon) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cajon) return res.status(204).send({ error: 'Cajon No Content' });
            return res.status(200).send({ data: cajon });
        });
    },
    getCajon(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Cajon.findById(req.params.id).populate('lote', '-__v').exec((err, cajon) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cajon) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: cajon });
        });
    },
    updateCajon(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        Cajon.findByIdAndUpdate(req.params.id, req.body, (err, cajonUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cajonUpdated) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: cajonUpdated });
        });
    },
    deleteCajon(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Cajon.findByIdAndDelete(req.params.id, (err, cajonDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cajonDeleted) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: cajonDeleted });
        });
    }//,
};

/*------------------------------------------------------------------*/

module.exports = cajonController;