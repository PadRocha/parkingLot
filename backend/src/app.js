'use strict'

const express = require('express'); //* Calls express
const cors = require('cors'); //* Calls cors
const morgan = require('morgan'); //* Calls morgan
const path = require('path'); //* Calls path
const multer = require('multer'); //* Calls multer
const uuidv4 = require('uuid/v4'); //* Calls uuid > v4 to random

const app = express();

/*------------------------------------------------------------------*/
// Settings
/*------------------------------------------------------------------*/

app.set('port', process.env.PORT || 4000);
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads/images'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
});

/*------------------------------------------------------------------*/
// Middlewares
/*------------------------------------------------------------------*/

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '1MB' }));
app.use(multer({
    storage,
    dest: path.join(__dirname, 'uploads/images'),
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
    limits: { fileSize: 500000 },
}).single('image'));

/*------------------------------------------------------------------*/
// Routes
/*------------------------------------------------------------------*/

app.use('/api', require('./routes/api.routes'));

/*------------------------------------------------------------------*/

module.exports = app;