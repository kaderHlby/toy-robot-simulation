"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Robot_1 = require("./Robot");
var FaceObject_1 = require("./objects/FaceObject");
var ConfigObject_1 = require("./objects/ConfigObject");
var Parser_1 = __importDefault(require("./helpers/Parser"));
var RobotManager = /** @class */ (function () {
    function RobotManager() {
    }
    /**
     * createRobot
     */
    RobotManager.prototype.createRobot = function (placeCommand) {
        var table = this.getTable(); // size 5 x 5 and origin is (0,0) you can change it from configObject
        var parser = new Parser_1.default();
        var _a = parser.getPlaceValues(placeCommand), x = _a.x, y = _a.y, face = _a.face;
        var faceObj = this.getFaceObjByStringKey(face); // sorry for this but i face an issue with getting obj by string key , there must be different way
        return new Robot_1.Robot(x, y, faceObj, table);
    };
    RobotManager.prototype.getFaceObjByStringKey = function (face) {
        var faceObjectValues = Object.values(FaceObject_1.FaceObject);
        var robotFace = {};
        for (var index = 0; index < faceObjectValues.length; index++) {
            var faceObj = faceObjectValues[index];
            if (faceObj.name == face) {
                robotFace = faceObj;
            }
        }
        return robotFace;
    };
    /**
     * createTable
     */
    RobotManager.prototype.getTable = function () {
        return {
            size: ConfigObject_1.ConfigObject.size,
            originX: ConfigObject_1.ConfigObject.originX,
            originY: ConfigObject_1.ConfigObject.originY
        };
    };
    return RobotManager;
}());
exports.default = RobotManager;
