const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        unique: false
    },
    Fname: {
        type: String,
        required: true,
        unique: false
    },
    Lname: {
        type: String,
        required: true,
        unique: false
    },
    role: {
        type: String,
        required: false,
        unique: false
    }
});

module.exports = mongoose.model('User', UserSchema);