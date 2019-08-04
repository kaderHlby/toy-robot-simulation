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
}
