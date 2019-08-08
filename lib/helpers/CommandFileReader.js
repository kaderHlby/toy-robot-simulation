"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var CommandFileReader = /** @class */ (function () {
    function CommandFileReader(filePath) {
        this._filePath = filePath;
    }
    /**
     * getFirstPlaceCommandsFromFile
     */
    CommandFileReader.prototype.getFirstCommands = function () {
        return this.getCommands()[0];
    };
    /**
     * getCommandsFromFile
     */
    CommandFileReader.prototype.getCommands = function () {
        var commands = fs
            .readFileSync(this._filePath)
            .toString()
            .trim();
        // return empty array in case the file is empty
        if (commands) {
            return commands
                .split("\n")
                .map(Function.prototype.call, String.prototype.trim); // trim each command
        }
        return [];
    };
    return CommandFileReader;
}());
exports.default = CommandFileReader;
