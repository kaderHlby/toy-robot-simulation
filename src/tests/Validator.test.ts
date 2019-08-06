import { expect } from "chai";
import Validator from "../helpers/Validator";
import { ValidationErrorObject } from "../objects/ValidationErrorObject";
import { ValidationRuleObject } from "../objects/ValidationRuleObject";
import { CommandObject } from "../objects/CommandObject";

const validator = new Validator();
const table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj

describe("validate", function() {
  //testing negative cases
  // fileExist: `file exist`,
  // firstCommandIsPlaceCommand: `first command is place command`,
  // allCommandsAreValid: `all commands are valid`,
  // validPlaceCommand: `valid place command`
  it("fileExist", function() {
    const invalidFilePath = "./wrongPath.txt";

    expect(function() {
      validator.fileExists(invalidFilePath);
    }).to.throw(ValidationErrorObject.fileDoesNotExist);
  });

  it("firstCommandIsPlaceCommand", function() {
    const firstCommand = CommandObject.MOVE;

    expect(function() {
      validator.firstCommandIsPlaceCommand(firstCommand);
    }).to.throw(ValidationErrorObject.firstCommand);
  });

  it("allCommandsAreValid", function() {
    const invalidCommand = "MOVEE";
    const commands = [CommandObject.PLACE, CommandObject.RIGHT, invalidCommand];

    expect(function() {
      validator.allCommandsAreValid(commands);
    }).to.throw(ValidationErrorObject.invalidCommand);
  });

  it("validPlaceCommandCaseOne", function() {
    const invalidPlaceCommand = "PLACE a,2,EAST";

    expect(function() {
      validator.validatePlaceCommand(invalidPlaceCommand);
    }).to.throw(ValidationErrorObject.mustBeANumber);
  });

  it("validPlaceCommandCaseTwo", function() {
    const invalidPlaceCommand = "PLACE 1,2,EAS";

    expect(function() {
      validator.validatePlaceCommand(invalidPlaceCommand);
    }).to.throw(ValidationErrorObject.invalidFace);
  });
});
