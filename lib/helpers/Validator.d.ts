import { Robot } from "../Robot";
export default class Validator {
    private fileExists;
    private validateCommands;
    validateFace(face: string): any;
    validatePlace(x: number, y: number, tableSize: number): any;
    validateFile(path: any): any;
    validateMove(robot: Robot): boolean;
}
