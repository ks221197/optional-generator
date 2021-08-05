"use strict";

const newAction = require('../actions/helper.action')
module.exports = (program) => {
    program
        .command('helper')
        .alias('hp')
        .description('Generate common useful files.')
        .action(() => {
            newAction();
        });
}


