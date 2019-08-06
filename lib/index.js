#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("./helpers/Validator"));
var CommandFileReader_1 = __importDefault(require("./helpers/CommandFileReader"));
var RobotManager_1 = __importDefault(require("./RobotManager"));
var ValidationRuleObject_1 = require("./objects/ValidationRuleObject");
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var path = require("path");
var program = require("commander");
var fs = require("fs");
// clear();
// console.log(
//   chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" }))
// );
function run(path) {
    var validator = new Validator_1.default();
    try {
        var validationRules = [
            ValidationRuleObject_1.ValidationRuleObject.fileExist,
            ValidationRuleObject_1.ValidationRuleObject.firstCommandIsPlaceCommand,
            ValidationRuleObject_1.ValidationRuleObject.allCommandsAreValid,
            ValidationRuleObject_1.ValidationRuleObject.validPlaceCommand
        ];
        validator.validate(path, validationRules);
        var commandFileReader = new CommandFileReader_1.default(path);
        var robotManager = new RobotManager_1.default();
        var placeCommand = commandFileReader.getFirstCommands();
        var robot = robotManager.createRobot(placeCommand);
        var commands = commandFileReader.getCommands();
        robot.executeCommands(commands);
    }
    catch (error) {
        console.log(error.message); // todo handle all kinds of exceptions, for example: in case the file does not exit ask for the correct path.
        return;
    }
}
program
    .version("0.0.1")
    .option("-p, --path <path>", "commands file path", run) //todo make path required and accept table size as an option
    .parse(process.argv);
