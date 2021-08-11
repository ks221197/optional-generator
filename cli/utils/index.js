"use strict";
const defaultValue = require("../../lib/common/schema");
var path = require('path')
const fs = require("fs")
const mustache = require('mustache');
var mkdirp = require('mkdirp')
const currentDir = '.'

const generateInput = (name, message, validateType = '') => {
    return (defaultAnswer) => ({
        type: 'input',
        name,
        message,
        default: defaultAnswer,
        validate(value) {
            if (validateType == 'moduleName') {
                const pass = value.match(
                    defaultValue.module.name_reqex
                );
                if (pass) {
                    return true;
                }
                return defaultValue.module.error_message;
            }
        }
    });
};
exports.generateInput = generateInput;

const generateList = (name, message) => {
    // return (message) => {
    return (choices) => ({
        type: 'list',
        name,
        message,
        choices,
    });
    // };
};
exports.generateList = generateList;

/**
 Returns the lowerCamelCase form of a string.

 ```javascript
 camelize('innerHTML');          // 'innerHTML'
 camelize('action_name');        // 'actionName'
 camelize('css-class-name');     // 'cssClassName'
 camelize('my favorite items');  // 'myFavoriteItems'
 camelize('My Favorite Items');  // 'myFavoriteItems'
 ```

 @method camelize
 @param {String} str The string to camelize.
 @return {String} the camelized string.
 */
function camelize(str) {
    return str
        .replace((/(-|_|\.|\s)+(.)?/g), (_match, _separator, chr) => {
            return chr ? chr.toUpperCase() : '';
        })
        .replace(/^([A-Z])/, (match) => match.toLowerCase());
}
exports.camelize = camelize;

/**
 Returns the UpperCamelCase form of a string.

 ```javascript
 'innerHTML'.classify();          // 'InnerHTML'
 'action_name'.classify();        // 'ActionName'
 'css-class-name'.classify();     // 'CssClassName'
 'my favorite items'.classify();  // 'MyFavoriteItems'
 ```

 @method classify
 @param {String} str the string to classify
 @return {String} the classified string
 */
function classify(str) {
    return str.split('.').map(part => capitalize(camelize(part))).join('.');
}
exports.classify = classify;

/**
 Returns the Capitalized form of a string

 ```javascript
 'innerHTML'.capitalize()         // 'InnerHTML'
 'action_name'.capitalize()       // 'Action_name'
 'css-class-name'.capitalize()    // 'Css-class-name'
 'my favorite items'.capitalize() // 'My favorite items'
 ```

 @method capitalize
 @param {String} str The string to capitalize.
 @return {String} The capitalized string.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
exports.capitalize = capitalize;

function createOrUpdateFile(source, destination, options) {
    try {
        const folderPath = path.dirname(destination)
        const directoryPath = path.join(currentDir, folderPath)
        if (!fs.existsSync(directoryPath)) {
            mkdirp.sync(directoryPath)
        }
        if (options.isOnlyCopy) {
            writeFile(path.resolve(__dirname, source), path.resolve(destination), options)
        }
        else copyFile(path.resolve(__dirname, source), path.resolve(destination))

    } catch (e) {
        console.log(e);
        console.log("Please try again...")
    }
}
exports.createOrUpdateFile = createOrUpdateFile;

function copyFile(from, to) {
    if (!fs.existsSync(to)) {
        console.log('   \x1b[33madd\x1b[0m : ' + to + path.sep);
        fs.copyFileSync(from, to, (err) => {
            if (err) { console.log(err); }
        });
    }
    else console.log('   \x1b[34mexists\x1b[0m : ' + to + path.sep);
}
exports.copyFile = copyFile;

function writeFile(from, to, options) {
    if (!fs.existsSync(to)) {
        console.log('   \x1b[33madd\x1b[0m : ' + to + path.sep);
        const template = fs.readFileSync(from).toString();

        if (options.moduleName) {
            options.classifyName = classify(options.moduleName),
                options.camelizeName = camelize(options.moduleName)
        }

        let content = mustache.render(template, options);
        fs.writeFileSync(path.resolve(to), content, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    else console.log('   \x1b[34mexists\x1b[0m : ' + to + path.sep);
}
exports.writeFile = writeFile;

function defaultCMDInstruction(options = {}) {
    const database = options && options.database ? options.database === 'MySQL' ? 'mysql' : options.database === 'MongoDB' ? 'mongoose' : options.database === 'PostgreSQL' ? 'pg' : '': '';
    console.log('\n👉  Get started with the following commands:\n' +
        '\n' +
        '\x1b[2m$ npm init -y \n' +
        '$ npm install express body-parser ' + database + ' --save && npm install nodemon --save-dev\n'+
        '$ node app.js || nodemon app.js\n\x1b[0m');
}
exports.defaultCMDInstruction = defaultCMDInstruction;