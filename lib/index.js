#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("./helpers/Validator"));
var CommandFileReader_1 = __importDefault(require("./helpers/CommandFileReader"));
var RobotManager_1 = __importDefault(require("./RobotManager"));
var Parser_1 = __importDefault(require("./helpers/Parser"));
var ValidationRuleObject_1 = require("./objects/ValidationRuleObject");
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var program = require("commander");
clear();
console.log(chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" })));
function run(path, log) {
    var validator = new Validator_1.default();
    var robotManager = new RobotManager_1.default();
    var commandFileReader = new CommandFileReader_1.default(path);
    var parser = new Parser_1.default();
    try {
        var validationRules = [
            ValidationRuleObject_1.ValidationRuleObject.fileExist,
            ValidationRuleObject_1.ValidationRuleObject.fileNotEmpty,
            ValidationRuleObject_1.ValidationRuleObject.firstCommandIsPlaceCommand,
            ValidationRuleObject_1.ValidationRuleObject.validPlaceCommand,
            ValidationRuleObject_1.ValidationRuleObject.allCommandsAreValid
        ];
        var table = robotManager.getTable();
        validator.validate(path, table, validationRules);
        var commands = commandFileReader.getCommands();
        var placeCommand = commandFileReader.getFirstCommands();
        var _a = parser.getPlaceValues(placeCommand), x = _a.x, y = _a.y, face = _a.face;
        var robot = robotManager.createRobot(x, y, face);
        if (log)
            console.log("your input: \n" + commands.join("\n") + "\n");
        if (log)
            console.log("robot was created at (" + x + "," + y + ") face: " + face);
        robot.executeCommands(commands, log);
    }
    catch (error) {
        console.log(error.message);
        return;
    }
}
program
    .version("0.0.1")
    .option("-p, --path <path>", "commands file path")
    .option("-l, --log ", "print each step to console")
    .parse(process.argv);
if (program.path) {
    run(program.path, program.log);
}
else {
    console.log("please provide path to commands file. (e.g., -P testCases/exampleA.txt) ");
}
