'use strict'

const jwt = require('jsonwebtoken'); //* Calls jsonwebtoken
const moment = require('moment'); //* Calls moment

exports.authorized = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).send({ error: 'Forbidden' });
    const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1];

    if (token === 'null') return res.status(403).send({ error: 'Forbidden' });

    try {
        var payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload.exp <= moment().unix()) return res.status(401).send({ error: 'Unauthorized' });
    } catch (error) {
        return res.status(404).send({ error: 'Token Not Found' });
    }

    req.user = payload;

    return next();
}