"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("./helpers/Validator"));
var Robot = /** @class */ (function () {
    function Robot(x, y, face, table) {
        this._X = x;
        this._Y = y;
        this._face = face;
        this._table = table;
    }
    Robot.prototype.getNextPosition = function () {
        return {
            x: this._X + this._face.xStep,
            y: this._Y + this._face.yStep
        };
    };
    Robot.prototype.getTableSize = function () {
        return this._table.size;
    };
    Robot.prototype.move = function () {
        var validator = new Validator_1.default();
        if (validator.validateMove(this)) {
            // this._X = this.getNextPosition.x;
            // this._Y = this.getNextPosition.y;
        }
        //else ignore invalid move
    };
    return Robot;
}());
exports.Robot = Robot;
