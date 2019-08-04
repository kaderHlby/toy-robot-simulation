#!/usr/bin/env node
"use strict";
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var path = require("path");
var program = require("commander");
var fs = require("fs");
clear();
console.log(chalk.red(figlet.textSync("robot-cli", { horizontalLayout: "full" })));
function fileDoesNotExist(path) {
    try {
        if (fs.existsSync(path)) {
            return false;
        }
    }
    catch (err) { }
    return true;
}
function parseFile(path) {
    return fs
        .readFileSync(path)
        .toString()
        .split("\n");
}
function run(path) {
    if (fileDoesNotExist(path)) {
        console.error("no such file or directory, " + path);
        return;
    }
    var commands = parseFile(path);
    console.log(commands);
}
program
    .version("0.0.1")
    .option("-p, --path <path>", "commands file path", run) //todo make path required
    .parse(process.argv);
