"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RobotManager_1 = __importDefault(require("../RobotManager"));
var Parser_1 = __importDefault(require("../helpers/Parser"));
var sinon = require("sinon");
var table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj
var commands = ["PLACE 1,0,NORTH", "MOVE", "REPORT"]; // mock getting commands form file
var parser = new Parser_1.default();
var _a = parser.getPlaceValues(commands[0]), x = _a.x, y = _a.y, face = _a.face;
var robotManager = new RobotManager_1.default();
// const robot = robotManager.createRobot(x, y, face, table);
describe("simulator", function () {
    // it("executeCommands", function() {
    //   let spy = sinon.spy(console, "log");
    //   robot.executeCommands(commands);
    //   expect(spy.calledWith('1,1,NORTH'));
    // });
});
