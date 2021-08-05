#!/usr/bin/env node
"use strict";
const commander = require("commander");
const _commands = require("../cli/commands/command.loader");

const program = commander;
program
  .usage('<command> [options]')
  .helpOption('-h, --help', 'Output usage information.');

_commands.CommandLoader.load(program)

commander.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

