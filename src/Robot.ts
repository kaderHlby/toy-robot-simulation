// import { Face } from "./objects/face";
import { ITable } from "./interfaces/ITable";
import Validator from "./helpers/Validator";
import { IFace } from "./interfaces/IFace";
import { IVector } from "./interfaces/IVector";

export class Robot {
  private _X: number;
  private _Y: number;
  private _face: IFace;
  private _table: ITable;

  constructor(x: number, y: number, face: IFace, table: ITable) {
    this._X = x;
    this._Y = y;
    this._face = face;
    this._table = table;
  }

  public getNextPosition(): IVector {
    return {
      x: this._X + this._face.xStep,
      y: this._Y + this._face.yStep
    };
  }

  public getTableSize() {
    return this._table.size;
  }

  move(): void {
    let validator = new Validator();
    if (validator.validateMove(this)) {
      // this._X = this.getNextPosition.x;
      // this._Y = this.getNextPosition.y;
    }
    //else ignore invalid move
  }
}
