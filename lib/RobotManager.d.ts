import { ITable } from "./interfaces/ITable";
export default class RobotManager {
    /**
     * createRobot
     */
    createRobot(x: number, y: number, face: string, table: ITable): any;
    private getFaceObjByStringKey;
    /**
     * createTable
     */
    createTable(tableSize: number, originX: number, originY: number): {
        size: number;
        originX: number;
        originY: number;
    };
}
