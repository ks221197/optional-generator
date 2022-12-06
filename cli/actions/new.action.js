const { generateInput, generateList, createOrUpdateFile, defaultCMDInstruction } = require("../utils");
const defaultValue = require("../../lib/common/schema");
const inquirer = require("inquirer");

module.exports = async (name, options) => {
    const replacedInputs = await checkInputs(name, options);
    generateApplicationFiles(replacedInputs)
    defaultCMDInstruction(replacedInputs)
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

    const scriptQuestion = { name: defaultValue.scriptType.name, message: defaultValue.scriptType.message, choices: defaultValue.scriptType.choices }

    const esQuestion = { name: defaultValue.scriptType.es.name, message: defaultValue.scriptType.es.message, choices: defaultValue.scriptType.es.choices }

    var prompt = await inquirer.createPromptModule();
    if (options && options.script) {
        if (typeof options.script === 'boolean' || (!defaultValue.scriptType.choices.map(type => type.toLowerCase()).includes(options.script) && !defaultValue.scriptType.choices.includes(options.script))) {
            let answer = await prompt(generateList(scriptQuestion.name, scriptQuestion.message)(scriptQuestion.choices))
            options.scriptType = answer[scriptQuestion.name]
        }
        options.scriptType = options.script
    }
    else {
        let answer = await prompt(generateList(scriptQuestion.name, scriptQuestion.message)(scriptQuestion.choices))
        options.scriptType = answer[scriptQuestion.name]
    }

    if ((options?.script && options?.script.toLowerCase() === 'javascript') || (options?.scriptType && options?.scriptType.toLowerCase() === 'javascript')) {
        let answer = await prompt(generateList(esQuestion.name, esQuestion.message)(esQuestion.choices))
        options.es = answer[esQuestion.name]
    }

    if (options && options.database) {
        if (typeof options.database === 'boolean' || (!defaultValue.database.choices.map(type => type.toLowerCase()).includes(options.database) && !defaultValue.database.choices.includes(options.database))) {
            let answer = await prompt(generateList(dbQuestion.name, dbQuestion.message)(dbQuestion.choices))
            options.database = answer[dbQuestion.name]
        }
    }
    else {
        let answer = await prompt(generateList(dbQuestion.name, dbQuestion.message)(dbQuestion.choices))
        options.database = answer[dbQuestion.name]
    }
    return options
}

function generateApplicationFiles(options) {
    defaultValue.paths.forEach(value => {
        const path = Object.values(value)
        if (Object.keys(value)[0] == '_model' && options.database !== 'MongoDB') { return; }
        if (Object.keys(value)[0] == '_babel' && options.scriptType.toLowerCase() === 'typescript') { return; }
        if (Object.keys(value)[0] == '_tsc' || Object.keys(value)[0] == '_interface' && options.scriptType.toLowerCase() != 'typescript') { return; }

        const source = ('../../' + defaultValue.root + path[0].source).replace('{{databaseType}}', '_' + options.database.toLowerCase());
        const destination = path[0].destination.replace('{{moduleName}}', options.name);
        createOrUpdateFile(source, destination, { isOnlyCopy: path[0].isOnlyCopy, moduleName: options.name, [options.database.toLowerCase()]: true, scriptType: options.scriptType ? options.scriptType.toLowerCase() : options.script.toLowerCase(), es: options?.es === 'yes' || !options?.es ? true : false })
    });
}

