"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.getPlaceValues = function (command) {
        var values = command.split(" ")[1].split(",");
        return {
            x: values[0],
            y: values[1],
            face: values[2]
        };
    };
    return Parser;
}());
exports.default = Parser;
