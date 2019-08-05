import { ITable } from "./interfaces/ITable";
import { IFace } from "./interfaces/IFace";
import { IVector } from "./interfaces/IVector";
export declare class Robot {
    private _X;
    private _Y;
    private _face;
    private _table;
    constructor(x: number, y: number, face: IFace, table: ITable);
    getNextPosition(): IVector;
    getTableSize(): number;
    move(): void;
}
