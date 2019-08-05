const fs = require("fs");

export default class Parser {
  /**
   * parseFile
commands:Array   */
  public parseFile(path: any) {
    return fs
      .readFileSync(path)
      .toString()
      .split("\n");
  }

  public getPlaceValues(command: string): any {
    let values = command.split(" ")[1].split(",");
    return {
      x: values[0],
      y: values[1],
      face: values[2]
    };
  }
}
