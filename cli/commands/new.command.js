"use strict";

const newAction = require('../actions/new.action')
module.exports = (program) => {
    program
        .command('new [name]')
        .alias('n')
        .description('Generate application.')
        .option('-d, --database [type]', 'Specify database type.')
        .action((name, options) => {
            newAction(name, options);
        });
}


