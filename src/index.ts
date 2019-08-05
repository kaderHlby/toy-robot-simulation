#!/usr/bin/env node
import Validator from "./helpers/Validator";
import Parser from "./helpers/Parser";
import RobotManager from "./RobotManager";
import { FaceObject } from "./objects/FaceObject";

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
  let validateFileError = validator.validateFile(path);
  if (Object.keys(validateFileError).length > 0) {
    console.log(validateFileError.message);
    return;
  }
  const parser = new Parser();
  const commands = parser.parseFile(path);
  // we already validate that first command is place
  let { x, y, face } = parser.getPlaceValues(commands[0]);
  let robotManager = new RobotManager();
  // create robot
  const tableSize = 5;
  const robot = robotManager.createRobot(tableSize, x, y, face);
  console.log(robot);
  // run commands and return robot position
}

program
  .version("0.0.1")
  .option("-p, --path <path>", "commands file path", run) //todo make path required and accept table size as an option
  .parse(process.argv);
