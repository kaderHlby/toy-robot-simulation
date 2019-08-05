const fs = require("fs");
import Parser from "./Parser";
import { CommandObject } from "../objects/CommandObject";
import { ValidationErrorObject } from "../objects/ValidationErrorObject";
import { Robot } from "../Robot";
import { FaceObject } from "../objects/FaceObject";
import { ITable } from "../interfaces/ITable";

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

    if (typeof x == "number") {
      return {
        message:
          `line 1: X ` + ValidationErrorObject.mustBeANumber + `${x} is given`
      };
    }
    if (typeof x == "number") {
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

  public validatePlace(x: number, y: number, table: ITable): any {
    if (x > table.size) {
      return {
        message: `x : ${x} ` + ValidationErrorObject.mustBeLessThanTableSize
      };
    }
    if (x < table.originX) {
      return {
        message: `x : ${x} ` + ValidationErrorObject.mustBeGreaterThanOrigin
      };
    }
    if (y > table.size) {
      return {
        message: `y : ${y} ` + ValidationErrorObject.mustBeLessThanTableSize
      };
    }
    if (y < table.originY) {
      return {
        message: `y : ${y} ` + ValidationErrorObject.mustBeGreaterThanOrigin
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
    let { x, y } = robot.getNextPosition();
    return (
      x <= robot.getTableSize() &&
      x >= robot.getOriginX() &&
      y <= robot.getTableSize() &&
      y >= robot.getOriginY()
    );
  }
}
