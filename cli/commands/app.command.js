"use strict";

const newAction = require('../actions/app.action')
module.exports = (program) => {
    program
        .command('app')
        .alias('a')
        .description('Generate application root file.')
        .action(() => {
            newAction();
        });
}


