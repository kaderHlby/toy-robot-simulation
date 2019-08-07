import { Robot } from "../Robot";
import { ITable } from "../interfaces/ITable";
export default class Validator {
    fileExists(path: any): void;
    firstCommandIsPlaceCommand(firstCommand: string): void;
    allCommandsAreValid(commands: Array<string>): void;
    validatePlaceCommand(placeCommand: string, table: ITable): void;
    validate(path: string, table: ITable, validationRules: Array<string>): void;
    validateMove(robot: Robot): boolean;
}
