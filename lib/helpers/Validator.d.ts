import { Robot } from "../Robot";
export default class Validator {
    fileExists(path: any): void;
    firstCommandIsPlaceCommand(firstCommand: string): void;
    allCommandsAreValid(commands: Array<string>): void;
    validatePlaceCommand(placeCommand: string): void;
    validate(path: string, validationRules: Array<string>): void;
    validateMove(robot: Robot): boolean;
}
