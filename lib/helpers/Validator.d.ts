import { Robot } from "../Robot";
import { ITable } from "../interfaces/ITable";
export default class Validator {
    private fileExists;
    private validateCommands;
    validateFace(face: string): any;
    validatePlace(x: number, y: number, table: ITable): any;
    validateFile(path: any): any;
    validateMove(robot: Robot): boolean;
}
