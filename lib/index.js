#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("./helpers/Validator"));
var Parser_1 = __importDefault(require("./helpers/Parser"));
var RobotManager_1 = __importDefault(require("./RobotManager"));
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var path = require("path");
var program = require("commander");
var fs = require("fs");
clear();
console.log(chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" })));
function run(path) {
    var validator = new Validator_1.default();
    var validateFileError = validator.validateFile(path);
    if (Object.keys(validateFileError).length > 0) {
        console.log(validateFileError.message);
        return;
    }
    var parser = new Parser_1.default();
    var commands = parser.parseFile(path);
    // we already validate that first command is place
    var _a = parser.getPlaceValues(commands[0]), x = _a.x, y = _a.y, face = _a.face;
    var robotManager = new RobotManager_1.default();
    // create robot
    var tableSize = 5;
    var robot = robotManager.createRobot(tableSize, x, y, face);
    console.log(robot);
    // run commands and return robot position
}
program
    .version("0.0.1")
    .option("-p, --path <path>", "commands file path", run) //todo make path required and accept table size as an option
    .parse(process.argv);
