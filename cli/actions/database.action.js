const {  generateList, createOrUpdateFile, defaultCMDInstruction } = require("../utils");
const defaultValue = require("../../lib/common/schema");
const inquirer = require("inquirer");

module.exports = async (type) => {
    const replacedInputs = await checkInputs(type);
    generateDatabaseConfigFile(replacedInputs)
    defaultCMDInstruction(replacedInputs)
    process.exit(0);
}
async function checkInputs(type) {
    options = await validateOptions({ database: type })
    return options
}

async function validateOptions(options) {
    const dbQuestion = { name: defaultValue.database.name, message: defaultValue.database.message, choices: defaultValue.database.choices }

    if (options && options.database) {
        if (typeof options.database === 'boolean' || (!defaultValue.database.choices.map(type => type.toLowerCase()).includes(options.database) && !defaultValue.database.choices.includes(options.database))) {
            var prompt = await inquirer.createPromptModule();
            const answer = await prompt(generateList(dbQuestion.name, dbQuestion.message)(dbQuestion.choices))
            options.database = answer[dbQuestion.name]
        }
    }
    else {
        var prompt = await inquirer.createPromptModule();
        const answer = await prompt(generateList(dbQuestion.name, dbQuestion.message)(dbQuestion.choices))
        options.database = answer[dbQuestion.name]
    }
    return options
}

function generateDatabaseConfigFile(options) {
    defaultValue.paths.find(value => {
        if (Object.keys(value)[0] == '_database') {
            const path = Object.values(value)
            const source = ('../../' + defaultValue.root + path[0].source);
            const destination = path[0].destination.replace('{{moduleName}}', 'index');
            createOrUpdateFile(source, destination, { isOnlyCopy: true, [options.database.toLowerCase()]: true })
        }
    })
}

