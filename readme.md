# Toy Robot Simulator

Node.js cli application for simulation of a toy robot moving on a square table.

### Prerequisites

To use this project, you'll need NodeJS. Visit http://www.nodejs.org to download and learn more!

### Installing on Unix and macOS

1. clone the repo

```bash
git clone git@github.com:kaderHlby/toy-robot-simulation.git
```

2. Change to the repo directory:

```
cd toy-robot-simulation
```

3. install typescript

```bash
npm install -g typescript
```

4. install npm dependencies and build

```bash
npm install
npm run build
```

5. link ropot

```bash
npm link ropot
```

6. finally run:

```bash
ropot -h
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

to be added later
escripot

## Built With

- [TypeScript](https://github.com/microsoft/TypeScript) 
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
