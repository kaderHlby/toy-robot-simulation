import { Robot } from "./Robot";
export default class RobotManager {
    /**
     * createRobot
     */
    createRobot(x: number, y: number, face: string): Robot;
    private getFaceObjByStringKey;
    /**
     * createTable
     */
    getTable(): {
        size: number;
        originX: number;
        originY: number;
    };
}
