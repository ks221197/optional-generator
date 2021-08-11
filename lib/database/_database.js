{{#mysql}}
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "boilerplate",
})

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");
});
{{/mysql}}

{{#mongodb}}
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/boilerplate'
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.on('open', function () {
    console.log('Connected to mongo server...');
})
{{/mongodb}}

{{#postgresql}}
const { Client } = require('pg')
const connection = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'boilerplate',
  password: 'postgres',
  port: 5432,
})

connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Postgres Connected");
})
{{/postgresql}}

module.exports=connection