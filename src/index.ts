#!/usr/bin/env node
import Validator from "./helpers/validator";
import Parser from "./helpers/parser";

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
  let error = validator.validateFile(path);
  if (Object.keys(error).length > 0) {
    console.log(error.message); //todo print all errors
    return;
  }
  const parser = new Parser();
  const commands = parser.parseFile(path);
  console.log(commands);
}

program
  .version("0.0.1")
  .option("-p, --path <path>", "commands file path", run) //todo make path required
  .parse(process.argv);
