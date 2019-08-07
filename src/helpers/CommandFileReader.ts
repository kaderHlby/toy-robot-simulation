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
  public getCommands(): any {
    let commands = fs
      .readFileSync(this._filePath)
      .toString()
      .trim();
      
    // return empty array in case the file is empty
    if (commands) {
      return commands
        .split("\n")
        .map(Function.prototype.call, String.prototype.trim); // trim each command
    }

    return [];
  }
}
