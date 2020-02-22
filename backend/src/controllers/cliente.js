'use strict'

/*------------------------------------------------------------------*/
// Controlador de cliente.js
/*------------------------------------------------------------------*/

const Cliente = require('../models/cliente'); //* Calls cliente.js model

const clienteController = {
    saveCliente(req, res) {
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        const newCliente = new Cliente(req.body, (err) => {
            if (err) return res.status(400).send({ error: 'Bad Request' });
        });
        newCliente.image = req.file ? req.file.filename : null;
        newCliente.save((err, clienteStored) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!clienteStored) return res.status(204).send({ error: 'Cliente No Content' });
            return res.status(200).send({ data: clienteStored });
        });
    },
    consultarCliente(req, res) {
        if (!req.params.param) return res.status(400).send({ error: 'Bad Request' });
        Cliente.findByName(req.params.param, (err, cliente) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cliente) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: cliente });
        });
    },
    listarCliente(req, res) {
        Cliente.find({}, (err, cliente) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cliente) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: cliente });
        });
    },
    getCliente(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Cliente.findById(req.params.id, (err, cliente) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!cliente) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: cliente });
        });
    },
    updateCliente(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        if (!req.body) return res.status(400).send({ error: 'Bad Request' });
        req.body.updatedAt = Date.now();
        Cliente.findOneAndUpdate(req.params.id, req.body, (err, clienteUpdated) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!clienteUpdated) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: clienteUpdated });
        });
    },
    deleteCliente(req, res) {
        if (!req.params.id) return res.status(400).send({ error: 'Bad Request' });
        Cliente.findOneAndDelete(req.params.id, (err, clienteDeleted) => {
            if (err) return res.status(500).send({ error: 'Internal Server Error' });
            if (!clienteDeleted) return res.status(404).send({ error: 'Cliente Not Found' });
            return res.status(200).send({ data: clienteDeleted });
        });
    }//,
};

/*------------------------------------------------------------------*/

module.exports = clienteController;