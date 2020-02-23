'use strict'

/*------------------------------------------------------------------*/
// Controlador de subscripcion.js
/*------------------------------------------------------------------*/

const Subscripcion = require('../models/subscripcion'); //* Calls subscripcion.js model

const subscripcionController = {
    saveSubscripcion(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newSubscripcion = new Subscripcion(req.body, (err) => {
            if (err) return res.status(400).send({ error: 'Bad Request' });
        });
        newSubscripcion.save((err, subscripcionStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcionStored) return res.status(204).send({ error: 'Subscripcion No Content' });
            return res.status(200).send({ data: subscripcionStored });
        });
    },
    listarSubscripcion(req, res) {
        Subscripcion.find({}).exec((err, subscripcion) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcion) return res.status(404).send({ error: 'Subscripcion Not Found' });
            return res.status(200).send({ data: subscripcion });
        });
    },
    getSubscripcion(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Subscripcion.findById(req.params.id).exec((err, subscripcion) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcion) return res.status(404).send({ error: 'Subscripcion Not Found' });
            return res.status(200).send({ data: subscripcion });
        });
    },
    updateSubscripcion(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        Subscripcion.findOneAndUpdate(req.params.id, req.body, (err, subscripcionUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcionUpdated) return res.status(404).send({ error: 'Subscripcion Not Found' });
            return res.status(200).send({ data: subscripcionUpdated });
        });
    },
    deleteSubscripcion(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Subscripcion.findOneAndDelete(req.params.id, (err, subscripcionDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcionDeleted) return res.status(404).send({ error: 'Subscripcion Not Found' });
            return res.status(200).send({ data: subscripcionDeleted });
        });
    },
};

/*------------------------------------------------------------------*/

module.exports = subscripcionController;