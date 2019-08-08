"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    /**
     * parseFile
  commands:Array   */
    Parser.prototype.parseFile = function (path) {
        return fs
            .readFileSync(path)
            .toString()
            .split("\n");
    };
    return Parser;
}());
exports.default = Parser;
