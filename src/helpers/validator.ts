const fs = require("fs");
import Parser from "./parser";
import { Commands } from "../consts/commands";
import { validationErrors } from "../consts/validationErrors";

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
    const firstCommand = commands[0].split(" ")[0];
    if (Commands.PLACE != firstCommand) {
      return { message: validationErrors.firstCommand + Commands.PLACE };
    }
    for (let index = 1; index < commands.length; index++) {
      const command = commands[index];
      if (Object.values(Commands).indexOf(command) == -1) {
        return {
          message:
            `line ${index + 1}: ${command}` + validationErrors.notValidCommand
        };
      } //todo handle multiple place commands 
    }
    return {};
  }

  public validateFile(path: any): any {
    if (!this.fileExists(path)) {
      return { message: validationErrors.fileDoesNotExist + path };
    }

    const parser = new Parser();
    const commands = parser.parseFile(path);
    return this.validateCommands(commands);
  }
}
