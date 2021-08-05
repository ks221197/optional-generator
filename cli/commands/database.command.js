"use strict";

const newAction = require('../actions/database.action')
module.exports = (program) => {
    program
        .command('database [type]')
        .alias('d')
        .description('Generate database configuration files.')
        .action((type) => {
            newAction(type);
        });
}


