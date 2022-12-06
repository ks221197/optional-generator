{{#mysql}}
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "{{database.dbName}}",
})

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");
});
function executeQuery(query, value = '') {
    return new Promise(function (resolve, reject) {
        console.log('executeQuery');
        connection.query(query, value, (error, results) => {
            (error) ? reject(error) : resolve(results);
        })
    })
}
{{/mysql}}

{{#mongodb}}
const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/{{database.dbName}}'
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
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
  database: '{{database.dbName}}',
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

module.exports= {{#mysql}} { {{/mysql}} connection {{#mysql}} , executeQuery } {{/mysql}}
