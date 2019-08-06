import { expect } from "chai";
import RobotManager from "../RobotManager";
import Parser from "../helpers/Parser";
const sinon = require("sinon");

const table = { size: 5, originX: 0, originY: 0 }; // mock creating table obj
let commands = ["PLACE 1,0,NORTH", "MOVE", "REPORT"]; // mock getting commands form file
const parser = new Parser();
let { x, y, face } = parser.getPlaceValues(commands[0]);
let robotManager = new RobotManager();
// const robot = robotManager.createRobot(x, y, face, table);

describe("simulator", function() {
  // it("executeCommands", function() {
  //   let spy = sinon.spy(console, "log");
  //   robot.executeCommands(commands);
  //   expect(spy.calledWith('1,1,NORTH'));
  // });
});
