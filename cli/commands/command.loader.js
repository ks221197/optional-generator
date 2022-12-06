"use strict";
const NewCommand = require("./new.command");
const ModuleCommand = require("./module.command");
const HelperCommand = require("./helper.command");
const DatabaseCommand = require("./database.command");
const AppCommand = require("./app.command");

class CommandLoader {
    static load(program) {
        NewCommand(program), ModuleCommand(program), HelperCommand(program), DatabaseCommand(program), AppCommand(program)
    }
}
exports.CommandLoader = CommandLoader;
