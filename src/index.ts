#!/usr/bin/env node
import Validator from "./helpers/Validator";
import CommandFileReader from "./helpers/CommandFileReader";
import RobotManager from "./RobotManager";
import { FaceObject } from "./objects/FaceObject";
import { ConfigObject } from "./objects/ConfigObject";
import { ValidationRuleObject } from "./objects/ValidationRuleObject";

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
const fs = require("fs");

// clear();
// console.log(
//   chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" }))
// );

function run(path: any) {
  const validator = new Validator();
  try {
    const validationRules = [
      ValidationRuleObject.fileExist,
      ValidationRuleObject.firstCommandIsPlaceCommand,
      ValidationRuleObject.allCommandsAreValid,
      ValidationRuleObject.validPlaceCommand
    ];

    validator.validate(path, validationRules);
    const commandFileReader = new CommandFileReader(path);
    const robotManager = new RobotManager();
    const placeCommand = commandFileReader.getFirstCommands();
    const robot = robotManager.createRobot(placeCommand);
    const commands = commandFileReader.getCommands();
    robot.executeCommands(commands);
  } catch (error) {
    console.log(error.message); // todo handle all kinds of exceptions, for example: in case the file does not exit ask for the correct path.
    return;
  }
}

program
  .version("0.0.1")
  .option("-p, --path <path>", "commands file path", run) //todo make path required and accept table size as an option
  .parse(process.argv);
