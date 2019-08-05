"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Parser_1 = __importDefault(require("./Parser"));
var CommandObject_1 = require("../objects/CommandObject");
var ValidationErrorObject_1 = require("../objects/ValidationErrorObject");
var FaceObject_1 = require("../objects/FaceObject");
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.prototype.fileExists = function (path) {
        try {
            if (fs.existsSync(path)) {
                return true;
            }
        }
        catch (err) { }
        return false;
    };
    Validator.prototype.validateCommands = function (commands) {
        var firstCommand = commands[0].split(" ");
        if (CommandObject_1.CommandObject.PLACE != firstCommand[0]) {
            return {
                message: ValidationErrorObject_1.ValidationErrorObject.firstCommand + CommandObject_1.CommandObject.PLACE
            };
        }
        var parser = new Parser_1.default();
        var _a = parser.getPlaceValues(commands[0]), x = _a.x, y = _a.y, face = _a.face;
        if (typeof x == "number") {
            return {
                message: "line 1: X " + ValidationErrorObject_1.ValidationErrorObject.mustBeANumber + (x + " is given")
            };
        }
        if (typeof x == "number") {
            return {
                message: "line 1: Y " + ValidationErrorObject_1.ValidationErrorObject.mustBeANumber + (y + " is given")
            };
        }
        var validateFaceError = this.validateFace(face);
        if (Object.keys(validateFaceError).length > 0) {
            return validateFaceError;
        }
        for (var index = 1; index < commands.length; index++) {
            var command = commands[index];
            if (Object.values(CommandObject_1.CommandObject).indexOf(command) == -1) {
                return {
                    message: "line " + (index + 1) + ": " + command +
                        ValidationErrorObject_1.ValidationErrorObject.notValidCommand
                };
            } //todo handle multiple place commands
        }
        return {};
    };
    Validator.prototype.validateFace = function (face) {
        if (Object.keys(FaceObject_1.FaceObject).indexOf(face) == -1) {
            return {
                message: "" + face + ValidationErrorObject_1.ValidationErrorObject.notValidFace
            };
        }
        return {};
    };
    Validator.prototype.validatePlace = function (x, y, tableSize) {
        if (x > tableSize) {
            return {
                message: "x : " + x + " " + ValidationErrorObject_1.ValidationErrorObject.mustBeLessThanTableSize
            };
        }
        if (y > tableSize) {
            return {
                message: "y : " + y + " " + ValidationErrorObject_1.ValidationErrorObject.mustBeLessThanTableSize
            };
        }
        return {};
    };
    Validator.prototype.validateFile = function (path) {
        if (!this.fileExists(path)) {
            return { message: ValidationErrorObject_1.ValidationErrorObject.fileDoesNotExist + path };
        }
        var parser = new Parser_1.default();
        var commands = parser.parseFile(path);
        return this.validateCommands(commands);
    };
    Validator.prototype.validateMove = function (robot) {
        var _a = robot.getNextPosition(), x = _a.x, y = _a.y;
        return (x <= robot.getTableSize() &&
            x >= robot.getOriginX() &&
            y <= robot.getTableSize() &&
            y >= robot.getOriginY());
    };
    return Validator;
}());
exports.default = Validator;
