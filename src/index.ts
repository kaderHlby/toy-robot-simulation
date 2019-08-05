#!/usr/bin/env node
import Validator from "./helpers/Validator";
import Parser from "./helpers/Parser";
import RobotManager from "./RobotManager";
import { FaceObject } from "./objects/FaceObject";
import { ConfigObject } from "./objects/ConfigObject";

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

function run(path: any) {
  let validator = new Validator();
  let validateFileError = validator.validateFile(path); // todo throw exception instead of returning error obj
  if (Object.keys(validateFileError).length > 0) {
    console.log(validateFileError.message);
    return;
  }
  const parser = new Parser();
  const commands = parser.parseFile(path);

  let robotManager = new RobotManager();
  let { size, originX, originY } = ConfigObject;
  const table = robotManager.createTable(size, originX, originY); // size 5 x 5 and origin is (0,0) you can change it from configObject
  // we already validate that first command is place
  let { x, y, face } = parser.getPlaceValues(commands[0]);

  let validatePlaceError = validator.validatePlace(x, y, table); // todo throw exception instead of returning error obj
  if (Object.keys(validatePlaceError).length > 0) {
    console.log(validatePlaceError.message);
    return;
  }
  const robot = robotManager.createRobot(x, y, face, table);
  robot.executeCommands(commands);
}

program
  .version("0.0.1")
  .option("-p, --path <path>", "commands file path", run) //todo make path required and accept table size as an option
  .parse(process.argv);
