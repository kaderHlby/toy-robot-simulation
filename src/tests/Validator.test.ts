import { expect } from "chai";
import Validator from "../helpers/Validator";
import { ValidationErrorObject } from "../objects/ValidationErrorObject";
import { ValidationRuleObject } from "../objects/ValidationRuleObject";
import { CommandObject } from "../objects/CommandObject";

const validator = new Validator();
const table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj

describe("testing all validation rules, it should throw an exception when:", function() {
  //testing negative cases

  it("file does not exist", function() {
    const invalidFilePath = "./wrongPath.txt";

    expect(function() {
      validator.fileExists(invalidFilePath);
    }).to.throw(ValidationErrorObject.fileDoesNotExist);
  });

  it("file is empty", function() {
    const emptyFilePath = "testCases/emptyFile.txt";

    expect(function() {
      validator.fileNotEmpty(emptyFilePath);
    }).to.throw(ValidationErrorObject.fileIsEmpty);
  });

  it("first command is not place command", function() {
    const firstCommand = CommandObject.MOVE;

    expect(function() {
      validator.firstCommandIsPlaceCommand(firstCommand);
    }).to.throw(ValidationErrorObject.firstCommand);
  });

  it("one of the command is not valid", function() {
    const invalidCommand = "MOVEE";
    const commands = [CommandObject.PLACE, CommandObject.RIGHT, invalidCommand];

    expect(function() {
      validator.allCommandsAreValid(commands);
    }).to.throw(ValidationErrorObject.invalidCommand);
  });

  it("place command is invalid: x and y are outside table range", function() {
    const invalidPlaceCommand = "PLACE a,2,EAST";

    expect(function() {
      validator.validatePlaceCommand(invalidPlaceCommand, table);
    }).to.throw(ValidationErrorObject.mustBeANumber);
  });

  it("place command is invalid: invalid face", function() {
    const invalidPlaceCommand = "PLACE 1,2,EAS";

    expect(function() {
      validator.validatePlaceCommand(invalidPlaceCommand, table);
    }).to.throw(ValidationErrorObject.invalidFace);
  });
});
