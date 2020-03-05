'use strict'

require('dotenv').config();

require('./database');

const http = require('http'); //* Calls http
const socket = require('socket.io'); //* Calls socket.io

const app = require('./app');

(async () => {
    const server = await app.listen(app.get('port'));
    console.log('server', app.get('port'));

    const io = socket(server);
    // console.log("io", io)
    io.on('connection', socket => {
        console.log('new Connection');
        socket.emit('hello', {
            greetting: 'Hello Paul'
        });
    });
})();