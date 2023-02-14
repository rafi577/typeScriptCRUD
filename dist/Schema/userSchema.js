"use strict";
const mongooseUser = require('mongoose');
const userSchema = new mongooseUser.Schema({
    _id: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        //unique: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});
module.exports = userSchema;
