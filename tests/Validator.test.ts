import { expect } from "chai";
import Validator from "../src/helpers/Validator";
import { ValidationErrorObject } from "../src/objects/ValidationErrorObject";

const validator = new Validator();
const table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj

describe("validate", function() {
  it("placeCommand", function() {
    let validationErrors = validator.validatePlace(1, 2, table);
    expect(validationErrors).empty;
  });

  it("wrongPlaceCommandValues", function() {
    let validationErrors = validator.validatePlace(-1, -2, table); // it should fail and return validation error size origin is (0,0)
    expect(validationErrors.message).contain(
      ValidationErrorObject.mustBeGreaterThanOrigin
    );
  });

  it("firstCommandIsPlaceCommand", function() {
    let moveCommand = "MOVE";
    let validationErrors = validator.validateCommands([moveCommand]);
    expect(validationErrors.message).contain(
      ValidationErrorObject.firstCommand
    );
  });

  it("validCommands", function() {
    let firstCommand = "PLACE 1,2,EAST";
    let wrongCommand = "MOVEE";
    let validationErrors = validator.validateCommands([
      firstCommand,
      wrongCommand
    ]);
    expect(validationErrors.message).contain(
      ValidationErrorObject.notValidCommand
    );
  });

  it("validFaces", function() {
    let wrongFace = "EASTT";
    let validationErrors = validator.validateFace(wrongFace);
    expect(validationErrors.message).contain(
      ValidationErrorObject.notValidFace
    );
  });
});
