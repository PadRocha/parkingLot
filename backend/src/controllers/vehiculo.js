'use strict'

/*------------------------------------------------------------------*/
// Controlador de vehiculo.js
/*------------------------------------------------------------------*/

const Vehiculo = require('../models/vehiculo'); //* Calls vehiculo.js model

const vehiculoController = {
    listarVehiculo(req, res) {
        Vehiculo.find({}).populate('cliente', 'name').exec((err, vehiculo) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!vehiculo) return res.status(404).send({ error: 'Vehiculo Not Found' });
            return res.status(200).send({ data: vehiculo });
        });
    },
    saveVehiculo(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newVehiculo = new Vehiculo(req.body);
        newVehiculo.save((err, vehiculoStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!vehiculoStored) return res.status(204).send({ error: 'Vehiculo No Content' });
            return res.status(200).send({ data: vehiculoStored });
        });
    },
    getVehiculo(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Vehiculo.findById(req.params.id).populate('cliente').exec((err, vehiculo) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!vehiculo) return res.status(404).send({ error: 'Vehiculo Not Found' });
            return res.status(200).send({ data: vehiculo });
        });
    },
    updateVehiculo(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        Vehiculo.findByIdAndUpdate(req.params.id, req.body, (err, vehiculoUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!vehiculoUpdated) return res.status(404).send({ error: 'Vehiculo Not Found' });
            return res.status(200).send({ data: vehiculoUpdated });
        });
    },
    deleteVehiculo(req, res) {
        //
    }//,
};

/*------------------------------------------------------------------*/

module.exports = vehiculoController;