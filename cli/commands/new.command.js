"use strict";

const newAction = require('../actions/new.action')
const defaultValue = require("../../lib/common/schema");

module.exports = (program) => {
    program
        .command('new [name]')
        .alias('n')
        .description('Generate application.')
        .option('-d, --database [type]', 'Specify database type.')
        .option('--script [type]', 'Specify script type.')
        .action((name, options) => {
            newAction(name, options);
        });
}


