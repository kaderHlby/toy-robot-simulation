export default class CommandFileReader {
    private _filePath;
    constructor(filePath: string);
    /**
     * getFirstPlaceCommandsFromFile
     */
    getFirstCommands(): string;
    /**
     * getCommandsFromFile
     */
    getCommands(): any;
}
