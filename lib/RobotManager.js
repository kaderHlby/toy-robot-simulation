"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Robot_1 = require("./Robot");
var FaceObject_1 = require("./objects/FaceObject");
var ConfigObject_1 = require("./objects/ConfigObject");
var RobotManager = /** @class */ (function () {
    function RobotManager() {
    }
    /**
     * createRobot
     */
    RobotManager.prototype.createRobot = function (x, y, face) {
        var table = this.getTable(); // size 5 x 5 and origin is (0,0) you can change it from configObject
        var faceObj = this.getFaceObjByStringKey(face); // sorry for this but i tried getting the value by index like faceObj[face] but didn't work, there must be different way
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
