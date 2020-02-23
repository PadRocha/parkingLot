'use strict'

/*------------------------------------------------------------------*/
// Controlador de lote.js
/*------------------------------------------------------------------*/

const Lote = require('../models/lote'); //* Calls lote.js model

const loteController = {
    listarLote(req, res) {
        Lote.find({}, (err, lote) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!lote) return res.status(404).send({ error: 'Lote Not Found' });
            return res.status(200).send({ data: lote });
        });
    },
    saveLote(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newLote = new Lote(req.body);
        newLote.save((err, loteStored) => {
            console.log("TCL: saveLote -> err", err)
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!loteStored) return res.status(204).send({ error: 'Lote No Content' });
            return res.status(200).send({ data: loteStored });
        });
    },
    getLote(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Lote.findById(req.params.id).exec((err, lote) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!lote) return res.status(404).send({ error: 'Lote Not Found' });
            return res.status(200).send({ data: lote });
        });
    },
    updateLote(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        // req.body.updatedAt = Date.now();
        Lote.findByIdAndUpdate(req.params.id, req.body, (err, loteUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!loteUpdated) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: loteUpdated });
        });
    },
    deleteLote(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Lote.findByIdAndDelete(req.params.id, (err, loteDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!loteDeleted) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: loteDeleted });
        });
    }//,
};

/*------------------------------------------------------------------*/

module.exports = loteController;