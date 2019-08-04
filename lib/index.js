#!/usr/bin/env node
"use strict";
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
clear();
console.log(chalk.red(figlet.textSync('robot-cli', { horizontalLayout: 'full' })));
program
    .version('0.0.2')
    .description("A CLI for simulating robot's movement")
    .option('-f, --file', 'Input from file')
    .option('-i, --standard-input', 'Input from standard input')
    .parse(process.argv);
