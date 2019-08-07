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
    private left;
    private right;
    private move;
    private report;
    executeCommands(commands: Array<string>, log: boolean): void;
}
