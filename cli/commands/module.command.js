"use strict";

const newAction = require('../actions/module.action')
module.exports = (program) => {
    program
        .command('module [name]')
        .alias('m')
        .description('Generate CRUD.')
        .option('-d, --database [type]', 'Specify database type.')
        .action((name, options) => {
            newAction(name, options);
        });
}


