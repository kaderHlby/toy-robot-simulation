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
describe("testing all validation rules, it should throw an exception when:", function () {
    //testing negative cases
    it("file does not exist", function () {
        var invalidFilePath = "./wrongPath.txt";
        chai_1.expect(function () {
            validator.fileExists(invalidFilePath);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.fileDoesNotExist);
    });
    it("file is empty", function () {
        var emptyFilePath = "testCases/emptyFile.txt";
        chai_1.expect(function () {
            validator.fileNotEmpty(emptyFilePath);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.fileIsEmpty);
    });
    it("first command is not place command", function () {
        var firstCommand = CommandObject_1.CommandObject.MOVE;
        chai_1.expect(function () {
            validator.firstCommandIsPlaceCommand(firstCommand);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.firstCommand);
    });
    it("one of the command is not valid", function () {
        var invalidCommand = "MOVEE";
        var commands = [CommandObject_1.CommandObject.PLACE, CommandObject_1.CommandObject.RIGHT, invalidCommand];
        chai_1.expect(function () {
            validator.allCommandsAreValid(commands);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.invalidCommand);
    });
    it("place command is invalid: x and y are outside table range", function () {
        var invalidPlaceCommand = "PLACE a,2,EAST";
        chai_1.expect(function () {
            validator.validatePlaceCommand(invalidPlaceCommand, table);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.mustBeANumber);
    });
    it("place command is invalid: invalid face", function () {
        var invalidPlaceCommand = "PLACE 1,2,EAS";
        chai_1.expect(function () {
            validator.validatePlaceCommand(invalidPlaceCommand, table);
        }).to.throw(ValidationErrorObject_1.ValidationErrorObject.invalidFace);
    });
});
