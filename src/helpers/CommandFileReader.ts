const fs = require("fs");

export default class CommandFileReader {
  private _filePath: string;

  constructor(filePath: string) {
    this._filePath = filePath;
  }

  /**
   * getFirstPlaceCommandsFromFile
   */
  public getFirstCommands(): string {
    return this.getCommands()[0];
  }

  /**
   * getCommandsFromFile
   */
  public getCommands(): Array<string> {
    return fs
      .readFileSync(this._filePath)
      .toString()
      .split("\n");
  }
}
