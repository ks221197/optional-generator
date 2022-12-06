"use strict";

const databaseAction = require('../actions/database.action')
module.exports = (program) => {
    program
        .command('database [type]')
        .alias('d')
        .description('Generate database configuration files.')
        .action((type) => {
            databaseAction(type);
        });
}


