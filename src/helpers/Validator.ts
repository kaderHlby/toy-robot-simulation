const fs = require("fs");
import Parser from "./Parser";
import { CommandObject } from "../objects/CommandObject";
import { ValidationErrorObject } from "../objects/ValidationErrorObject";
import { Robot } from "../Robot";
import { FaceObject } from "../objects/FaceObject";
import { ValidationRuleObject } from "../objects/ValidationRuleObject";
import CommandFileReader from "./CommandFileReader";
import RobotManager from "../RobotManager";
import { ITable } from "../interfaces/ITable";

export default class Validator {
  public fileExists(path: any): void {
    try {
      if (fs.existsSync(path)) {
        return;
      }
    } catch (err) {}
    throw new Error(ValidationErrorObject.fileDoesNotExist + path);
  }

  public firstCommandIsPlaceCommand(firstCommand: string): void {
    if (CommandObject.PLACE != firstCommand.split(" ")[0]) {
      throw new Error(ValidationErrorObject.firstCommand + CommandObject.PLACE);
    }
  }

  public allCommandsAreValid(commands: Array<string>): void {
    // start from second command, since the first one should be place
    for (let index = 1; index < commands.length; index++) {
      const command = commands[index];
      if (Object.values(CommandObject).indexOf(command) == -1) {
        throw new Error(
          `line ${index + 1}: ${command}` + ValidationErrorObject.invalidCommand
        );
      } //todo handle multiple place commands
    }
  }

  public validatePlaceCommand(placeCommand: string, table: ITable): void {
    const parser = new Parser();
    let { x, y, face } = parser.getPlaceValues(placeCommand);
    // validate x,y type
    if (isNaN(Number(x))) {
      throw new Error(
        `line 1: X ` + ValidationErrorObject.mustBeANumber + `${x} is given`
      );
    }
    if (isNaN(Number(y))) {
      throw new Error(
        `line 1: Y ` + ValidationErrorObject.mustBeANumber + `${y} is given`
      );
    }

    // validate x,y values with the table size and origin
    if (x > table.size) {
      throw new Error(
        `x : ${x} ` + ValidationErrorObject.mustBeLessThanTableSize
      );
    }
    if (x < table.originX) {
      throw new Error(
        `x : ${x} ` + ValidationErrorObject.mustBeGreaterThanOrigin
      );
    }
    if (y > table.size) {
      throw new Error(
        `y : ${y} ` + ValidationErrorObject.mustBeLessThanTableSize
      );
    }
    if (y < table.originY) {
      throw new Error(
        `y : ${y} ` + ValidationErrorObject.mustBeGreaterThanOrigin
      );
    }

    // validate face
    if (Object.keys(FaceObject).indexOf(face) == -1) {
      throw new Error(`${face}` + ValidationErrorObject.invalidFace);
    }
  }

  public validate(
    path: string,
    table: ITable,
    validationRules: Array<string>
  ): void {
    if (validationRules.indexOf(ValidationRuleObject.fileExist) > -1) {
      this.fileExists(path);
    }

    const commandFileReader = new CommandFileReader(path);
    const firstCommand = commandFileReader.getFirstCommands();
    const commands = commandFileReader.getCommands();

    if (
      validationRules.indexOf(ValidationRuleObject.allCommandsAreValid) > -1
    ) {
      this.allCommandsAreValid(commands);
    }
    if (
      validationRules.indexOf(ValidationRuleObject.firstCommandIsPlaceCommand) >
      -1
    ) {
      this.firstCommandIsPlaceCommand(firstCommand);
    }
    if (validationRules.indexOf(ValidationRuleObject.validPlaceCommand) > -1) {
      this.validatePlaceCommand(firstCommand, table);
    }
  }

  public validateMove(robot: Robot): boolean {
    let { x, y } = robot.getNextPosition();
    return (
      x <= robot.getTableSize() &&
      x >= robot.getOriginX() &&
      y <= robot.getTableSize() &&
      y >= robot.getOriginY()
    );
  }
}
