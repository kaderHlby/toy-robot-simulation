const fs = require("fs");
import Parser from "./Parser";
import { CommandObject } from "../objects/CommandObject";
import { ValidationErrorObject } from "../objects/ValidationErrorObject";
import { Robot } from "../Robot";
import { FaceObject } from "../objects/FaceObject";

export default class Validator {
  private fileExists(path: any): any {
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (err) {}
    return false;
  }

  private validateCommands(commands: string[]): any {
    const firstCommand = commands[0].split(" ");
    if (CommandObject.PLACE != firstCommand[0]) {
      return {
        message: ValidationErrorObject.firstCommand + CommandObject.PLACE
      };
    }
    const parser = new Parser();
    let { x, y, face } = parser.getPlaceValues(commands[0]);

    if (!Number(x)) {
      return {
        message:
          `line 1: X ` + ValidationErrorObject.mustBeANumber + `${x} is given`
      };
    }
    if (!Number(y)) {
      return {
        message:
          `line 1: Y ` + ValidationErrorObject.mustBeANumber + `${y} is given`
      };
    }
    var validateFaceError = this.validateFace(face);
    if (Object.keys(validateFaceError).length > 0) {
      return validateFaceError;
    }

    for (let index = 1; index < commands.length; index++) {
      const command = commands[index];
      if (Object.values(CommandObject).indexOf(command) == -1) {
        return {
          message:
            `line ${index + 1}: ${command}` +
            ValidationErrorObject.notValidCommand
        };
      } //todo handle multiple place commands
    }
    return {};
  }

  public validateFace(face: string): any {
    if (Object.keys(FaceObject).indexOf(face) == -1) {
      return {
        message: `${face}` + ValidationErrorObject.notValidFace
      };
    }
    return {};
  }

  public validatePlace(x: number, y: number, tableSize: number): any {
    if (x > tableSize) {
      return {
        message: `x : ${x} ` + ValidationErrorObject.mustBeLessThanTableSize
      };
    }
    if (y > tableSize) {
      return {
        message: `y : ${y} ` + ValidationErrorObject.mustBeLessThanTableSize
      };
    }
    return {};
  }

  public validateFile(path: any): any {
    if (!this.fileExists(path)) {
      return { message: ValidationErrorObject.fileDoesNotExist + path };
    }

    const parser = new Parser();
    const commands = parser.parseFile(path);
    return this.validateCommands(commands);
  }

  public validateMove(robot: Robot): boolean {
    // return (
    //   robot.getNextPosition.x <= robot.getTableSize &&
    //   robot.getNextPosition.y <= robot.getTableSize
    // );
    return true;
  }
}
