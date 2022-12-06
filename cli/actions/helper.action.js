const { createOrUpdateFile, defaultCMDInstruction } = require("../utils");
const defaultValue = require("../../lib/common/schema");
const inquirer = require("inquirer");

module.exports = () => {
    generateApplicationFiles()
    defaultCMDInstruction()
    process.exit(0);
}

function generateApplicationFiles(options) {
    defaultValue.paths.find(value => {
        if (Object.keys(value)[0] == '_responseHandler' || Object.keys(value)[0] == '_constant') {
            const path = Object.values(value)
            const source = '../../' + defaultValue.root + path[0].source;
            const destination = path[0].destination;
            createOrUpdateFile(source, destination, { isOnlyCopy: true})
        }
    })
}

