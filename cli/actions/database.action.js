const { createOrUpdateFile, defaultCMDInstruction, askQuestions } = require("../utils");
const defaultValue = require("../../lib/common/schema");

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
    let questions = defaultValue.database

    if (!options && !options.database && typeof options.database === 'boolean' || (!defaultValue.databaseType.choices.map(type => type.toLowerCase()).includes(options.database) && !defaultValue.databaseType.choices.includes(options.database))) {
        await askQuestions(questions).then((value) => {
            options.database = value
        });
    }
    else {
        const databaseObj = {}
        databaseObj['type'] = options.database
        questions.shift()
        await askQuestions(questions).then((answers) => {
            for (let key in answers) {
                databaseObj[key] = answers[key]
            }
        });
        options.database = databaseObj
    }
    return options
}

function generateDatabaseConfigFile(options) {
    defaultValue.paths.find(value => {
        if (Object.keys(value)[0] == '_database') {
            const path = Object.values(value)
            const source = ('../../' + defaultValue.root + path[0].source);
            const destination = path[0].destination.replace('{{moduleName}}', 'index');
            createOrUpdateFile(source, destination, { isOnlyCopy: true, [options.database.type.toLowerCase()]: true, database: options.database })
        }
    })
}

