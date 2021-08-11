const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var usersSchema = new Schema({}, { strict: false });

const usersModel = mongoose.model('Users', usersSchema, 'users');

module.exports = usersModel
