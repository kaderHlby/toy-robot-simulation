#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");
var fs = require("fs");

clear();
console.log(
  chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" }))
);

function fileDoesNotExist(path: any) {
  try {
    if (fs.existsSync(path)) {
      return false;
    }
  } catch (err) {}
  return true;
}

function parseFile(path: any) {
  return fs
    .readFileSync(path)
    .toString()
    .split("\n");
}

function run(path: any) {
  if (fileDoesNotExist(path)) {
    console.error(`no such file or directory, ${path}`);
    return;
  }
  const commands = parseFile(path);
  console.log(commands);
}

program
  .version("0.0.1")
  .option("-p, --path <path>", "commands file path", run) //todo make path required
  .parse(process.argv);
