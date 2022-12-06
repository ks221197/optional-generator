const { generateInput, generateList, createOrUpdateFile, defaultCMDInstruction, askQuestions } = require("../utils");
const defaultValue = require("../../lib/common/schema");
const inquirer = require("inquirer");

module.exports = async (name, options) => {
    const replacedInputs = await checkInputs(name, options);
    generateModuleFiles(replacedInputs)
    defaultCMDInstruction(replacedInputs)
    process.exit(0);
}
async function checkInputs(name, options) {
    name = await validateName(name)
    options = await validateDatabaseOptions(options)
    return { name, ...options }
}

async function askModuleName() {
    let moduleName = 'index'
    const questions = defaultValue.module
    await askQuestions(questions).then((value) => {
        moduleName = value
    });
    return moduleName['name']
}

async function validateName(value) {
    if (!value) {
        value = await askModuleName()
    }
    else if (!(value.match(defaultValue.name_reqex))) {
        console.log('\n\x1b[31m>> \x1b[0m' + defaultValue.error_message + '\x1b[0m')
        value = await askModuleName()
    }
    return value
}

async function askDatabaseOptions(questions, shift = false) {
    let databaseObj = {}
    if (shift) questions.shift()
    await askQuestions(questions).then((answers) => {
        for (let key in answers) {
            if (key === 'columns') {
                let databaseType = (typeof shift === 'boolean') ? answers['type'] : shift

                let column = ''
                let value = ''
                let updateValue = ''
                databaseObj['columns'] = answers[key].split(",").filter(function (name) {
                    return name != null && name != "";
                });

                if (databaseObj['columns'] && databaseObj['columns'].length > 0) {
                    for (let i = 1; i < databaseObj['columns'].length; i++) {
                        console.log(databaseObj['columns'][i]);
                        column += databaseObj['columns'][i] + ','
                        value += (databaseType.toLowerCase() === 'mysql') ? '?,' : '$' + i + ','
                        updateValue += (databaseType.toLowerCase() === 'mysql') ? databaseObj['columns'][i] + '=?,' : databaseObj['columns'][i] + '=$' + (i+1) + ','
                    }
                }
                databaseObj['primaryKey'] = databaseObj['columns'][0];

                if (databaseType.toLowerCase() === 'mysql' || databaseType.toLowerCase() === 'postgresql') {
                    databaseObj['column'] = column.replace(/,\s*$/, "");
                    databaseObj['value'] = value.replace(/,\s*$/, "");
                    databaseObj['updateValue'] = updateValue.replace(/,\s*$/, "");
                }
            }
            else {
                databaseObj[key] = answers[key]
            }
        }
    });
    return databaseObj
}

async function validateDatabaseOptions(options) {
    let questions = defaultValue.database
    let databaseObj = {}

    if (!options && !options.database && typeof options.database === 'boolean' || (!defaultValue.databaseType.choices.map(type => type.toLowerCase()).includes(options.database) && !defaultValue.databaseType.choices.includes(options.database))) {
        databaseObj = await askDatabaseOptions(questions)
    }
    else {
        databaseObj = await askDatabaseOptions(questions, databaseObj['type'])
        databaseObj['type'] = options.database
    }
    options.database = databaseObj
    return options
}

function generateModuleFiles(options) {
    console.log(options);

    // console.log(function () {return function (options.database) {return "kkkk"}});

    // "wrapped": function () {
    //     return function () {
    //         let column = ''
    //         let value = ''
    //         if (options.database.columns && options.database.columns.length > 0) {
    //             for (let i = 1; i < options.database.columns.length; i++) {
    //                 value += '?,'
    //                 column += options.database.columns[i] + ','
    //             }
    //         }
    //         const k = []
    //         k.push(column)
    //         k.push(value)
    //         console.log(k);
    //         return [column]
    //     }
    // }

    defaultValue.paths.find(value => {
        if (Object.keys(value)[0] == '_controller' || Object.keys(value)[0] == '_service' || Object.keys(value)[0] == '_route') {
            const path = Object.values(value)
            const source = '../../' + defaultValue.root + path[0].source;
            const destination = path[0].destination.replace('{{moduleName}}', options.name);
            createOrUpdateFile(source, destination, {
                isOnlyCopy: path[0].isOnlyCopy, moduleName: options.name, [options.database.type.toLowerCase()]: true, database: options.database,
            })
        }
    })
}

