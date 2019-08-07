import { Robot } from "./Robot";
import { FaceObject } from "./objects/FaceObject";
import { ConfigObject } from "./objects/ConfigObject";
import Parser from "./helpers/Parser";

export default class RobotManager {
  /**
   * createRobot
   */
  public createRobot(x: number, y: number, face: string): Robot {
    const table = this.getTable(); // size 5 x 5 and origin is (0,0) you can change it from configObject
    const faceObj = this.getFaceObjByStringKey(face); // sorry for this but i tried getting the value by index like faceObj[face] but didn't work, there must be different way
    return new Robot(x, y, faceObj, table);
  }

  private getFaceObjByStringKey(face: string): any {
    const faceObjectValues = Object.values(FaceObject);
    let robotFace = {};
    for (let index = 0; index < faceObjectValues.length; index++) {
      const faceObj = faceObjectValues[index];
      if (faceObj.name == face) {
        robotFace = faceObj;
      }
    }
    return robotFace;
  }

  /**
   * createTable
   */
  public getTable() {
    return {
      size: ConfigObject.size,
      originX: ConfigObject.originX,
      originY: ConfigObject.originY
    };
  }
}
