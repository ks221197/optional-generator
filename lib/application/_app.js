{{^es}}
const express = require('express');
const bodyParser = require('body-parser');
{{^postgresql}}
const { initializeDatabase } = require('./config/database');
const config = require('./config/env');
{{/postgresql}}
{{/es}}
{{#es}}
import express from "express";
import * as bodyParser from "body-parser";
{{^postgresql}}
import { initializeDatabase } from './config/database';
import config from "./config/env";
{{/postgresql}}
{{/es}}
{{^isCommand}}
{{^es}}
const {{ classifyName }}Router = require('./routes/{{camelizeName}}.route')
{{/es}}
{{#es}}
import {{ classifyName }}Router from './routes/{{camelizeName}}.route'
{{/es}}
{{/isCommand}}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello user!!!')
})
{{^isCommand}}
{{^postgresql}}initializeDatabase(config[process.env.NODE_ENV || "local"].db);{{/postgresql}}
app.use('/{{camelizeName}}', {{ classifyName }}Router, function (req, res, next) {
  next()
})
{{/isCommand}}

{{^es}}
module.exports = app;
{{/es}}
{{#es}}
export default app;
{{/es}}
