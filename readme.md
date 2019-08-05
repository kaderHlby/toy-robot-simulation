# Toy Robot Simulator

Node.js cli application for simulation of a toy robot moving on a square table.

### Prerequisites

- [NodeJS](http://www.nodejs.org)
- Node Version Manager [nvm](https://github.com/nvm-sh/nvm) version 0.32.1

### Installing on Unix and macOS

1. clone the repository

```bash
git clone git@github.com:kaderHlby/toy-robot-simulation.git
```

2. Change to the repository directory:

```
cd toy-robot-simulation
```

3. install typescript

```bash
npm install -g typescript
```

4. install npm dependencies

```bash
npm install
```

5. link robot

```bash
npm link robot
```

6. finally run:

```bash
robot -h
```

you should see

```
Usage: robot [options]

Options:
  -V, --version      output the version number
  -p, --path <path>  commands file path
  -h, --help         output usage information

```

## Run application with test data

```bash
robot -p ./testCases/exampleA.txt
robot -p ./testCases/exampleB.txt
robot -p ./testCases/exampleC.txt
```

## Running the tests

```bash
npm run test-mocha
```

## Built With

- [TypeScript](https://github.com/microsoft/TypeScript)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
