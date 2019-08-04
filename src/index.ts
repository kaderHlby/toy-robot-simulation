#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

clear();
console.log(
  chalk.red(
    figlet.textSync('robot-cli', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.2')
  .description("A CLI for simulating robot's movement")
  .option('-f, --file', 'Input from file')
  .option('-i, --standard-input', 'Input from standard input')
  .parse(process.argv);