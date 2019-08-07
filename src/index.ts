#!/usr/bin/env node
import Validator from "./helpers/Validator";
import CommandFileReader from "./helpers/CommandFileReader";
import RobotManager from "./RobotManager";
import { FaceObject } from "./objects/FaceObject";
import { ConfigObject } from "./objects/ConfigObject";
import { ValidationRuleObject } from "./objects/ValidationRuleObject";
import Parser from "./helpers/Parser";

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
const fs = require("fs");

clear();
console.log(
  chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" }))
);

function run(path: any, log: any) {
  const validator = new Validator();
  const robotManager = new RobotManager();
  const commandFileReader = new CommandFileReader(path);
  const parser = new Parser();

  try {
    const validationRules = [
      ValidationRuleObject.fileExist,
      ValidationRuleObject.fileNotEmpty,
      ValidationRuleObject.firstCommandIsPlaceCommand,
      ValidationRuleObject.validPlaceCommand,
      ValidationRuleObject.allCommandsAreValid
    ];

    const table = robotManager.getTable();

    validator.validate(path, table, validationRules);
    
    const commands = commandFileReader.getCommands();
    const placeCommand = commandFileReader.getFirstCommands();
    let { x, y, face } = parser.getPlaceValues(placeCommand);
    const robot = robotManager.createRobot(x, y, face);
    if (log) console.log(`your input: \n${commands.join("\n")}\n`);
    if (log) console.log(`robot was created at (${x},${y}) face: ${face}`);
    robot.executeCommands(commands, log);
  } catch (error) {
    console.log(error.message); // todo handle all kinds of exceptions, for example: in case the file does not exit ask for the correct path.
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
} else {
  console.log(
    "please provide path to commands file. (e.g., -P testCases/exampleA.txt) "
  );
}
