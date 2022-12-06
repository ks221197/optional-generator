{{#mysql}}
{{^es}}
const mysql = require("mysql");
{{/es}}
{{#es}}
import mysql from "mysql";
{{#ts}}import { IConfig } from "../interface/common.interface";{{/ts}}
{{/es}}

let connection{{#ts}}:any{{/ts}} = null
{{#es}}export {{/es}}function initializeDatabase(databaseConfig{{#ts}}:IConfig{{/ts}}) {
     connection = mysql.createConnection({
        ...databaseConfig
    })

    connection.connect((err{{#ts}}:any{{/ts}}) => {
        if (err) {
            throw err;
        }
        console.log("MySql Connected");
    });
}

{{#es}}export {{/es}}function executeQuery(query{{#ts}}:any{{/ts}}, value{{#ts}}:any{{/ts}} = ''){{#ts}}:Promise<any>{{/ts}} {
    return new Promise(function (resolve, reject) {
        console.log('executeQuery');
        connection.query(query, value, (error{{#ts}}:any{{/ts}}, results{{#ts}}:any{{/ts}}) => {
            (error) ? reject(error) : resolve(results);
        })
    })
}

{{^es}}module.exports= { initializeDatabase  , executeQuery }{{/es}}
{{/mysql}}
{{#mongodb}}
{{^es}}
const mongoose = require('mongoose');
{{/es}}
{{#es}}
import mongoose from "mongoose";
{{#ts}}import { IConfig } from "../interface/common.interface";{{/ts}}
{{/es}}
{{#es}}export {{/es}}function initializeDatabase(databaseConfig{{#ts}}:IConfig{{/ts}}){{#ts}}:any{{/ts}} {
    const connectionString = databaseConfig?.connectionString
    mongoose.connect(connectionString)
    const connection = mongoose.connection

    connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    connection.on('open', function () {
        console.log('Connected to mongo server...');
    })
}

{{^es}}module.exports = { initializeDatabase }{{/es}}
{{/mongodb}}
{{#postgresql}}
{{^es}}
const { Client } = require('pg')
const config = require('./env');
{{/es}}
{{#es}}
import { Client } from "pg";
import config from './env';
{{/es}}
const databaseConfig = (config[process.env.NODE_ENV || "local"].db);

{{#es}}export {{/es}}const connection = new Client({
        ...databaseConfig
    })
    
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Postgres Connected");
})
      
{{^es}}module.exports = {connection}{{/es}}
{{/postgresql}}
{{#typeorm}}
import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "gnest",
  synchronize: false,
  logging: true,
  entities: ['./src/entities/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: [],
})

{{/typeorm}}
