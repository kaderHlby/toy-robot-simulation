// import { Face } from "./objects/face";
import { ITable } from "./interfaces/ITable";
import Validator from "./helpers/Validator";
import { IFace } from "./interfaces/IFace";
import { CommandObject } from "./objects/CommandObject";
import { FaceObject } from "./objects/FaceObject";

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
  public getX(): number {
    return this._X;
  }

  public getY(): number {
    return this._Y;
  }

  public getTableSize() {
    return this._table.size;
  }

  public getOriginX() {
    return this._table.originX;
  }

  public getOriginY() {
    return this._table.originY;
  }

  public getNextPosition() {
    return {
      x: Number(this._X) + Number(this._face.xStep),
      y: Number(this._Y) + Number(this._face.yStep)
    };
  }

  public getNextLeft() {
    switch (this._face) {
      case FaceObject.EAST:
        return FaceObject.NORTH;

      case FaceObject.NORTH:
        return FaceObject.WEST;

      case FaceObject.WEST:
        return FaceObject.SOUTH;

      case FaceObject.SOUTH:
        return FaceObject.EAST;

      default:
        return FaceObject.EAST;
    }
  }

  public getNextRight() {
    switch (this._face) {
      case FaceObject.EAST:
        return FaceObject.SOUTH;

      case FaceObject.SOUTH:
        return FaceObject.WEST;

      case FaceObject.WEST:
        return FaceObject.NORTH;

      case FaceObject.NORTH:
        return FaceObject.EAST;

      default:
        return FaceObject.EAST;
    }
  }

  private move(): void {
    let validator = new Validator();
    if (validator.validateMove(this)) {
      this._X = this.getNextPosition().x;
      this._Y = this.getNextPosition().y;
    }
    //else ignore invalid move
  }

  private left(): void {
    this._face = this.getNextLeft();
  }

  private right(): void {
    this._face = this.getNextRight();
  }

  executeCommands(commands: Array<string>): void {
    commands.forEach(command => {
      if (command == CommandObject.MOVE) {
        this.move();
      } else if (command == CommandObject.LEFT) {
        this.left();
      } else if (command == CommandObject.RIGHT) {
        this.right();
      } else if (command == CommandObject.REPORT) {
        this.report();
      }
    });
  }

  report(): void {
    console.log(`${this._X},${this._Y},${this._face.name}`);
  }
}
