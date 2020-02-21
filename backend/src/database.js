'use strict'

/*------------------------------------------------------------------*/
// Data Base connection
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose

const URI = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost/database';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, err => {
    if (err) console.log('Error! > ' + err);
    else console.log('DB Connected');
});
