'use Strict'

/*------------------------------------------------------------------*/
// Modelo de user.js
/*------------------------------------------------------------------*/

const mongoose = require('mongoose'); //* Calls mongoose
const bcryptjs = require('bcryptjs'); //* Calls bcryptjs

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: String,
    password: String
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcryptjs.genSalt(Number(process.env.SALT), function (err, salt) {
        if (err) return next(err);
        bcryptjs.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    });
});

userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
};

/*------------------------------------------------------------------*/

module.exports = mongoose.model('User', userSchema);