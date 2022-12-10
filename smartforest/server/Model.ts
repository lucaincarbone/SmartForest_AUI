import gameState from './gameState.json';
import fs from 'fs';

/**
 * Singleton class that represents the model of the game.
 * It contains all the information about the status of the Forest,
 * it is modified/accessed by all the states.
 */
export class Model {
    //TODO implement Tree object?
    private static _instance: Model;

    private constructor() {
        console.log("Creating a new Model...")
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public readFromJsonFile() {
        console.log(JSON.stringify(gameState))
    }

    public updateJsonFile() {
        gameState.id += 50;
        fs.writeFile("server/gameState.json", JSON.stringify(gameState), err => {
            if (err) console.log("Error writing file:", err);
        });
    }
}
