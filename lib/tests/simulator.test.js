"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var RobotManager_1 = __importDefault(require("../RobotManager"));
var Parser_1 = __importDefault(require("../helpers/Parser"));
var sinon = require("sinon");
var table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj
var commands = ["PLACE 1,0,NORTH", "MOVE", "REPORT"]; // mock getting commands form file
var parser = new Parser_1.default();
var _a = parser.getPlaceValues(commands[0]), x = _a.x, y = _a.y, face = _a.face;
var robotManager = new RobotManager_1.default();
var robot = robotManager.createRobot(x, y, face);
describe("simulator", function () {
    it("executeCommands", function () {
        var spy = sinon.spy(console, "log");
        robot.executeCommands(commands);
        chai_1.expect(spy.calledWith('1,1,NORTH'));
    });
});
