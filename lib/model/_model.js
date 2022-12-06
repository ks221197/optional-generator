{{#es}}import mongoose from "mongoose"; {{/es}}{{^es}}const mongoose = require('mongoose'); {{/es}}

const Schema = mongoose.Schema;

var usersSchema = new Schema({}, { strict: false });

{{#es}}export {{/es}}const usersModel = mongoose.model('Users', usersSchema, 'users');

{{^es}}module.exports = usersModel{{/es}}

