#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("./helpers/validator"));
var parser_1 = __importDefault(require("./helpers/parser"));
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var path = require("path");
var program = require("commander");
var fs = require("fs");
clear();
console.log(chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" })));
function run(path) {
    var validator = new validator_1.default();
    var error = validator.validateFile(path);
    if (Object.keys(error).length > 0) {
        console.log(error.message); //todo print all errors
        return;
    }
    var parser = new parser_1.default();
    var commands = parser.parseFile(path);
    console.log(commands);
}
program
    .version("0.0.1")
    .option("-p, --path <path>", "commands file path", run) //todo make path required
    .parse(process.argv);
