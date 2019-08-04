"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var parser_1 = __importDefault(require("./parser"));
var commands_1 = require("../consts/commands");
var validationErrors_1 = require("../consts/validationErrors");
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
        if (commands_1.Commands.PLACE != firstCommand) {
            return { message: validationErrors_1.validationErrors.firstCommand + commands_1.Commands.PLACE };
        }
        for (var index = 1; index < commands.length; index++) {
            var command = commands[index];
            if (Object.values(commands_1.Commands).indexOf(command) == -1) {
                return {
                    message: "line " + (index + 1) + ": " + command + validationErrors_1.validationErrors.notValidCommand
                };
            } //todo handle multiple place commands 
        }
        return {};
    };
    Validator.prototype.validateFile = function (path) {
        if (!this.fileExists(path)) {
            return { message: validationErrors_1.validationErrors.fileDoesNotExist + path };
        }
        var parser = new parser_1.default();
        var commands = parser.parseFile(path);
        return this.validateCommands(commands);
    };
    return Validator;
}());
exports.default = Validator;
