"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var parser_1 = __importDefault(require("./parser"));
var command_1 = require("../objects/command");
var validationError_1 = require("../objects/validationError");
var face_1 = require("../objects/face");
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
        var firstCommand = commands[0].split(" ")[0];
        if (command_1.Command.PLACE != firstCommand) {
            return { message: validationError_1.validationError.firstCommand + command_1.Command.PLACE };
        }
        for (var index = 1; index < commands.length; index++) {
            var command = commands[index];
            if (Object.values(command_1.Command).indexOf(command) == -1) {
                return {
                    message: "line " + (index + 1) + ": " + command + validationError_1.validationError.notValidCommand
                };
            } //todo handle multiple place commands
        }
        return {};
    };
    Validator.prototype.validateFace = function (face) {
        if (Object.keys(face_1.Face).indexOf(face) == -1) {
            return {
                message: "" + face + validationError_1.validationError.notValidCommand
            };
        }
        return {};
    };
    Validator.prototype.validateFile = function (path) {
        if (!this.fileExists(path)) {
            return { message: validationError_1.validationError.fileDoesNotExist + path };
        }
        var parser = new parser_1.default();
        var commands = parser.parseFile(path);
        return this.validateCommands(commands);
    };
    Validator.prototype.validateMove = function (robot) {
        // return (
        //   robot.getNextPosition.x <= robot.getTableSize &&
        //   robot.getNextPosition.y <= robot.getTableSize
        // );
        return true;
    };
    return Validator;
}());
exports.default = Validator;
