"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Robot_1 = require("./Robot");
var Validator_1 = __importDefault(require("./helpers/Validator"));
var FaceObject_1 = require("./objects/FaceObject");
var RobotManager = /** @class */ (function () {
    function RobotManager() {
    }
    /**
     * createRobot
     */
    RobotManager.prototype.createRobot = function (x, y, face, table) {
        var validator = new Validator_1.default();
        var validateFaceError = validator.validateFace(face); // todo throw exception instead of returning error obj
        if (Object.keys(validateFaceError).length > 0) {
            console.log(validateFaceError.message);
            return;
        }
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
    RobotManager.prototype.createTable = function (tableSize, originX, originY) {
        return { size: tableSize, originX: originX, originY: originY };
    };
    return RobotManager;
}());
exports.default = RobotManager;
