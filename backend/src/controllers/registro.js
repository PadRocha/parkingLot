'use strict'

/*------------------------------------------------------------------*/
// Controlador de registro.js
/*------------------------------------------------------------------*/

const Registro = require('../models/registro'); //* Calls registro.js model

const registroController = {
    saveRegistro(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newRegistro = new Registro(req.body);

        const Subscripcion = require('../models/subscripcion'); //* Calls subscripcion.js model

        Subscripcion.findOne({ matricula: newRegistro.matricula, end: { $gt: Date.now() } }).exec((err, subscripcion) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcion) return res.status(401).send({ error: 'Unauthorized Subscripcion' });
            Registro.findOne({ matricula: newRegistro.matricula, updatedAt: null }).exec((err, registro) => {
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (registro) return res.status(401).send({ error: 'Unauthorized Registro' });
                newRegistro.save((err, registroStored) => {
                    if (err) return res.status(500).send({ error: 'Internal Server Error' });
                    if (!registroStored) return res.status(204).send({ error: 'Registro No Content' });
                    return res.status(200).send({ data: registroStored });
                });
            });
        });
    },
    listarRegistro(req, res) {
        Registro.find({}).populate({ path: 'vehiculo', select: '-__v', populate: { path: 'cliente', select: 'name' } }).exec((err, registro) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!registro) return res.status(404).send({ error: 'Registro Not Found' });
            return res.status(200).send({ data: registro });
        });
    },
    getRegistro(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Registro.findById(req.params.id).populate({ path: 'vehiculo', select: '-__v', populate: { path: 'cliente', select: 'name' } }).exec((err, registro) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!registro) return res.status(404).send({ error: 'Registro Not Found' });
            return res.status(200).send({ data: registro });
        });
    },
    updateRegistro(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Registro.findByIdAndUpdate(req.params.id, { updatedAt: Date.now() }, (err, registroUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!registroUpdated) return res.status(404).send({ error: 'Registro Not Found' });
            return res.status(200).send({ data: registroUpdated });
        });
    },
    deleteRegistro(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Registro.findByIdAndDelete(req.params.id, (err, registroDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!registroDeleted) return res.status(404).send({ error: 'Registro Not Found' });
            return res.status(200).send({ data: registroDeleted });
        });
    }//,
};

/*------------------------------------------------------------------*/

module.exports = registroController;