const { generateInput, generateList, createOrUpdateFile } = require("../utils");
const defaultValue = require("../../lib/common/schema");
const inquirer = require("inquirer");

// include fs-extra package
var fs = require("fs-extra");

module.exports = async (name, options) => {

    const replacedInputs = await checkInputs(name, options);
    generateApplicationFiles(replacedInputs)
    process.exit(0);
}
async function checkInputs(name, options) {
    name = await validateName(name)
    options = await validateOptions(options)
    return { name, ...options }
}

async function askModuleName() {
    const question = { name: defaultValue.module.name, message: defaultValue.module.message, defaultName: defaultValue.module.defaultName }
    var prompt = await inquirer.createPromptModule();
    const answer = await prompt(generateInput(question.name, question.message, 'moduleName')(question.defaultName))
    return answer[question.name]
}

async function validateName(value) {
    const question = { name: defaultValue.module.name, message: defaultValue.module.message, defaultName: defaultValue.module.defaultName }

    value = !value ? await askModuleName() : !(value.match(defaultValue.module.name_reqex)) ? (console.log('\n\x1b[31m>> \x1b[0m' + defaultValue.module.error_message + '\x1b[0m'), await askModuleName()) : value
    return value
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

function generateApplicationFiles(options) {
    defaultValue.paths.forEach(path => {
        const source = ('../../' + defaultValue.root + path.source).replace('{{databaseType}}', '_' + options.database.toLowerCase());
        const destination = path.destination.replace('{{moduleName}}', options.name);
        createOrUpdateFile(source, destination, path.isOnlyCopy ? options.name : null)
    });
}

