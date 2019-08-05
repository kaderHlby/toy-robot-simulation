"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("./helpers/Validator"));
var CommandObject_1 = require("./objects/CommandObject");
var FaceObject_1 = require("./objects/FaceObject");
var Robot = /** @class */ (function () {
    function Robot(x, y, face, table) {
        this._X = x;
        this._Y = y;
        this._face = face;
        this._table = table;
    }
    Robot.prototype.getX = function () {
        return this._X;
    };
    Robot.prototype.getY = function () {
        return this._Y;
    };
    Robot.prototype.getTableSize = function () {
        return this._table.size;
    };
    Robot.prototype.getOriginX = function () {
        return this._table.originX;
    };
    Robot.prototype.getOriginY = function () {
        return this._table.originY;
    };
    Robot.prototype.getNextPosition = function () {
        return {
            x: Number(this._X) + Number(this._face.xStep),
            y: Number(this._Y) + Number(this._face.yStep)
        };
    };
    Robot.prototype.getNextLeft = function () {
        switch (this._face) {
            case FaceObject_1.FaceObject.EAST:
                return FaceObject_1.FaceObject.NORTH;
            case FaceObject_1.FaceObject.NORTH:
                return FaceObject_1.FaceObject.WEST;
            case FaceObject_1.FaceObject.WEST:
                return FaceObject_1.FaceObject.SOUTH;
            case FaceObject_1.FaceObject.SOUTH:
                return FaceObject_1.FaceObject.EAST;
            default:
                return FaceObject_1.FaceObject.EAST;
        }
    };
    Robot.prototype.getNextRight = function () {
        switch (this._face) {
            case FaceObject_1.FaceObject.EAST:
                return FaceObject_1.FaceObject.SOUTH;
            case FaceObject_1.FaceObject.SOUTH:
                return FaceObject_1.FaceObject.WEST;
            case FaceObject_1.FaceObject.WEST:
                return FaceObject_1.FaceObject.NORTH;
            case FaceObject_1.FaceObject.NORTH:
                return FaceObject_1.FaceObject.EAST;
            default:
                return FaceObject_1.FaceObject.EAST;
        }
    };
    Robot.prototype.move = function () {
        var validator = new Validator_1.default();
        if (validator.validateMove(this)) {
            this._X = this.getNextPosition().x;
            this._Y = this.getNextPosition().y;
        }
        //else ignore invalid move
    };
    Robot.prototype.left = function () {
        this._face = this.getNextLeft();
    };
    Robot.prototype.right = function () { };
    Robot.prototype.executeCommands = function (commands) {
        var _this = this;
        commands.forEach(function (command) {
            if (command == CommandObject_1.CommandObject.MOVE) {
                _this.move();
            }
            else if (command == CommandObject_1.CommandObject.LEFT) {
                _this.left();
            }
            else if (command == CommandObject_1.CommandObject.RIGHT) {
                _this.right();
            }
        });
        return this.report();
    };
    Robot.prototype.report = function () {
        return this._X + "," + this._Y + "," + this._face.name;
    };
    return Robot;
}());
exports.Robot = Robot;
