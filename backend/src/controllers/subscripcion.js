'use strict'

/*------------------------------------------------------------------*/
// Controlador de subscripcion.js
/*------------------------------------------------------------------*/

const moment = require('moment'); //* Calls moment

const Subscripcion = require('../models/subscripcion'); //* Calls subscripcion.js model

const subscripcionController = {
    saveSubscripcion(req, res) {
        if (!req.body && !req.body.matricula && !req.body.add1 && !req.body.add2) return res.status(400).send({ error: 'Bad Request' });
        const newSubscripcion = new Subscripcion(req.body);
        delete newSubscripcion._id;

        const Vehiculo = require('../models/vehiculo'); //* Calls vehiculo.js model

        Vehiculo.findOne({ matricula: req.body.matricula }).select('_id').exec((err, vehiculo) => {
            if (err) return res.status(500).send({ error: 'Vehiculo Internal Server Error' });
            if (!vehiculo) return res.status(404).send({ error: 'Unauthorized Vehiculo' });
            Subscripcion.findOne({ vehiculo: vehiculo._id, end: { $gt: Date.now() } }).sort('-start').exec((err, subscripcion) => {
                if (err) return res.status(500).send({ error: 'Subscripcion Internal Server Error' });
                if (!subscripcion) { //* Verify susbscripcion doesnt exists

                    const Cajon = require('../models/cajon'); //* Calls cajon.js model

                    Cajon.findOne({ available: true }).select('_id').exec((err, cajon) => {
                        if (err) return res.status(500).send({ error: 'Cajon Internal Server Error' });
                        if (!cajon) return res.status(404).send({ error: 'cajon Not available' });
                        let date = Date.now();
                        newSubscripcion.vehiculo = vehiculo._id;
                        newSubscripcion.cajon = cajon._id;
                        newSubscripcion.start = date;
                        newSubscripcion.end = moment(date).add(req.body.add1, req.body.add2);
                        newSubscripcion.save((err, subscripcionStored) => {
                            if (err) return res.status(500).send({ error: 'Internal Server Error' });
                            if (!subscripcionStored) return res.status(204).send({ error: 'Subscripcion No Content' });
                            Cajon.findByIdAndUpdate(cajon._id, { available: false }, (err, cajonUpdated) => {
                                if (err) return res.status(500).send({ error: 'Cajon Internal Server Error' });
                                if (!cajonUpdated) return res.status(404).send({ error: 'Cajon Not Found' });
                                return res.status(200).send({ data: subscripcionStored });
                            });
                        });
                    });
                } else { //* Clone Subscripcion and add time
                    newSubscripcion.vehiculo = subscripcion.vehiculo;
                    newSubscripcion.cajon = subscripcion.cajon;
                    newSubscripcion.start = subscripcion.end;
                    newSubscripcion.end = moment(subscripcion.end).add(req.body.add1, req.body.add2);
                    newSubscripcion.save((err, subscripcionStored) => {
                        if (err) return res.status(500).send({ error: 'Update Internal Server Error' });
                        if (!subscripcionStored) return res.status(204).send({ error: 'Subscripcion No Content' });
                        return res.status(200).send({ data: subscripcionStored });
                    });
                }
            });
        });
    },
    listarSubscripcion(req, res) {
        Subscripcion.find({}).populate({ path: 'cajon', select: 'number', populate: { path: 'lote', select: 'name' } })
            .populate({ path: 'vehiculo', select: '-__v', populate: { path: 'cliente', select: 'name' } }).exec((err, subscripcion) => {
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!subscripcion) return res.status(404).send({ error: 'Subscripcion Not Found' });
                return res.status(200).send({ data: subscripcion });
            });
    },
    getSubscripcion(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Subscripcion.findById(req.params.id).populate({ path: 'cajon', select: 'number', populate: { path: 'lote', select: 'name' } })
            .populate({ path: 'vehiculo', select: '-__v', populate: { path: 'cliente', select: 'name' } }).exec((err, subscripcion) => {
                if (err) return res.status(500).send({ error: 'Internal Server Error' });
                if (!subscripcion) return res.status(404).send({ error: 'Subscripcion Not Found' });
                return res.status(200).send({ data: subscripcion });
            });
    },
    updateSubscripcion(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        Subscripcion.findByIdAndUpdate(req.params.id, req.body, (err, subscripcionUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcionUpdated) return res.status(404).send({ error: 'Subscripcion Not Found' });
            return res.status(200).send({ data: subscripcionUpdated });
        });
    },
    deleteSubscripcion(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Subscripcion.findByIdAndDelete(req.params.id, (err, subscripcionDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!subscripcionDeleted) return res.status(404).send({ error: 'Subscripcion Not Found' });
            return res.status(200).send({ data: subscripcionDeleted });
        });
    }
};

/*------------------------------------------------------------------*/

module.exports = subscripcionController;