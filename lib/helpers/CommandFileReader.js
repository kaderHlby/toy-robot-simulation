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
        return fs
            .readFileSync(this._filePath)
            .toString()
            .split("\n");
    };
    return CommandFileReader;
}());
exports.default = CommandFileReader;
