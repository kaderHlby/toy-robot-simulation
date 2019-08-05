import { ITable } from "./interfaces/ITable";
import { IFace } from "./interfaces/IFace";
export declare class Robot {
    private _X;
    private _Y;
    private _face;
    private _table;
    constructor(x: number, y: number, face: IFace, table: ITable);
    getX(): number;
    getY(): number;
    getTableSize(): number;
    getOriginX(): number;
    getOriginY(): number;
    getNextPosition(): {
        x: number;
        y: number;
    };
    getNextLeft(): {
        name: string;
        xStep: number;
        yStep: number;
    };
    getNextRight(): {
        name: string;
        xStep: number;
        yStep: number;
    };
    private move;
    private left;
    private right;
    executeCommands(commands: Array<string>): void;
    report(): void;
}
