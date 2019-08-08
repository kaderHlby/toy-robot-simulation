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
var ValidationRuleObject_1 = require("../objects/ValidationRuleObject");
var CommandFileReader_1 = __importDefault(require("./CommandFileReader"));
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.prototype.fileExists = function (path) {
        try {
            if (fs.existsSync(path)) {
                return;
            }
        }
        catch (err) { }
        throw new Error(ValidationErrorObject_1.ValidationErrorObject.fileDoesNotExist + path);
    };
    Validator.prototype.fileNotEmpty = function (path) {
        var commandFileReader = new CommandFileReader_1.default(path);
        var commands = commandFileReader.getCommands();
        if (commands.length == 0) {
            throw new Error(ValidationErrorObject_1.ValidationErrorObject.fileIsEmpty);
        }
    };
    Validator.prototype.firstCommandIsPlaceCommand = function (firstCommand) {
        if (CommandObject_1.CommandObject.PLACE != firstCommand.split(" ")[0]) {
            throw new Error(ValidationErrorObject_1.ValidationErrorObject.firstCommand + CommandObject_1.CommandObject.PLACE);
        }
    };
    Validator.prototype.allCommandsAreValid = function (commands) {
        // start from second command, since the first one should be place
        for (var index = 1; index < commands.length; index++) {
            var command = commands[index];
            if (Object.values(CommandObject_1.CommandObject).indexOf(command) == -1) {
                throw new Error("line " + (index + 1) + ": " + command + " " + ValidationErrorObject_1.ValidationErrorObject.invalidCommand);
            } //todo handle multiple place commands
        }
    };
    Validator.prototype.validatePlaceCommand = function (placeCommand, table) {
        var parser = new Parser_1.default();
        var _a = parser.getPlaceValues(placeCommand), x = _a.x, y = _a.y, face = _a.face;
        // validate x,y type
        if (isNaN(Number(x))) {
            throw new Error("line 1: X " + ValidationErrorObject_1.ValidationErrorObject.mustBeANumber + " " + x + " is given");
        }
        if (isNaN(Number(y))) {
            throw new Error("line 1: Y " + ValidationErrorObject_1.ValidationErrorObject.mustBeANumber + " " + y + " is given");
        }
        // validate x,y values with the table size and origin
        if (x > table.size) {
            throw new Error("x : " + x + "  " + ValidationErrorObject_1.ValidationErrorObject.mustBeLessThanTableSize);
        }
        if (x < table.originX) {
            throw new Error("x : " + x + " " + ValidationErrorObject_1.ValidationErrorObject.mustBeGreaterThanOrigin);
        }
        if (y > table.size) {
            throw new Error("y : " + y + " " + ValidationErrorObject_1.ValidationErrorObject.mustBeLessThanTableSize);
        }
        if (y < table.originY) {
            throw new Error("y : " + y + " " + ValidationErrorObject_1.ValidationErrorObject.mustBeGreaterThanOrigin);
        }
        // validate face
        if (Object.keys(FaceObject_1.FaceObject).indexOf(face) == -1) {
            throw new Error(face + " " + ValidationErrorObject_1.ValidationErrorObject.invalidFace);
        }
    };
    Validator.prototype.validate = function (path, table, validationRules) {
        if (validationRules.indexOf(ValidationRuleObject_1.ValidationRuleObject.fileExist) > -1) {
            this.fileExists(path);
        }
        if (validationRules.indexOf(ValidationRuleObject_1.ValidationRuleObject.fileExist) > -1) {
            this.fileNotEmpty(path);
        }
        var commandFileReader = new CommandFileReader_1.default(path);
        var firstCommand = commandFileReader.getFirstCommands();
        var commands = commandFileReader.getCommands();
        if (validationRules.indexOf(ValidationRuleObject_1.ValidationRuleObject.allCommandsAreValid) > -1) {
            this.allCommandsAreValid(commands);
        }
        if (validationRules.indexOf(ValidationRuleObject_1.ValidationRuleObject.firstCommandIsPlaceCommand) >
            -1) {
            this.firstCommandIsPlaceCommand(firstCommand);
        }
        if (validationRules.indexOf(ValidationRuleObject_1.ValidationRuleObject.validPlaceCommand) > -1) {
            this.validatePlaceCommand(firstCommand, table);
        }
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
