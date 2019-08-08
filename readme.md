# Toy Robot Simulator

Node.js cli application for simulation of a toy robot moving on a square table.

### Prerequisites

- [NodeJS](http://www.nodejs.org) build and tested using node v10.16.0
- Node Version Manager [nvm](https://github.com/nvm-sh/nvm)

### Installing on Unix and macOS

1. clone the repository

```bash
git clone https://github.com/kaderHlby/toy-robot-simulation.git
```

2. Change to the repository directory:

```
cd toy-robot-simulation
```

3. install typescript

```bash
npm install -g typescript
```

4. install npm dependencies and compile

```bash
npm install
tsc -p .
```

5. link robot

```bash
npm link robot
```

6. finally run:

```bash
robot -h
```

or using the npm

```bash
npm run robot-help
```

you should see:

```
  _ __    ___   | |__     ___   | |_            ___  | | (_)
 | '__|  / _ \  | '_ \   / _ \  | __|  _____   / __| | | | |
 | |    | (_) | | |_) | | (_) | | |_  |_____| | (__  | | | |
 |_|     \___/  |_.__/   \___/   \__|          \___| |_| |_|

Usage: robot [options]

Options:
  -V, --version      output the version number
  -p, --path <path>  commands file path
  -l, --log          print each step to console
  -h, --help         output usage information

```

## Run application with test data

```bash
robot -l -p testCases/exampleA.txt
robot -l -p testCases/exampleB.txt
robot -l -p testCases/exampleC.txt
```

or using the npm

```bash
npm run robot-path testCases/exampleA.txt
npm run robot-path testCases/exampleB.txt
npm run robot-path testCases/exampleC.txt
```

## Running the tests

```bash
npm run test-mocha
```

## Built With

- [TypeScript](https://github.com/microsoft/TypeScript)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
