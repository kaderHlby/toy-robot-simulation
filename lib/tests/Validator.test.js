"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Validator_1 = __importDefault(require("../helpers/Validator"));
var ValidationErrorObject_1 = require("../objects/ValidationErrorObject");
var CommandObject_1 = require("../objects/CommandObject");
var validator = new Validator_1.default();
var table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj
describe("validate", function () {
    //testing negative cases
    // fileExist: `file exist`,
    // firstCommandIsPlaceCommand: `first command is place command`,
    // allCommandsAreValid: `all commands are valid`,
    // validPlaceCommand: `valid place command`
    it("fileExist", function () {
        var invalidFilePath = "./wrongPath.txt";
        chai_1.expect(function () {
            validator.fileExists(invalidFilePath);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.fileDoesNotExist);
    });
    it("firstCommandIsPlaceCommand", function () {
        var firstCommand = CommandObject_1.CommandObject.MOVE;
        chai_1.expect(function () {
            validator.firstCommandIsPlaceCommand(firstCommand);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.firstCommand);
    });
    it("allCommandsAreValid", function () {
        var invalidCommand = "MOVEE";
        var commands = [CommandObject_1.CommandObject.PLACE, CommandObject_1.CommandObject.RIGHT, invalidCommand];
        chai_1.expect(function () {
            validator.allCommandsAreValid(commands);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.invalidCommand);
    });
    it("validPlaceCommandCaseOne", function () {
        var invalidPlaceCommand = "PLACE a,2,EAST";
        chai_1.expect(function () {
            validator.validatePlaceCommand(invalidPlaceCommand, table);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.mustBeANumber);
    });
    it("validPlaceCommandCaseTwo", function () {
        var invalidPlaceCommand = "PLACE 1,2,EAS";
        chai_1.expect(function () {
            validator.validatePlaceCommand(invalidPlaceCommand, table);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.invalidFace);
    });
});
