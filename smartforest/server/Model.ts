import fs from 'fs';
import {Tree} from "~/server/Tree";

/**
 * Singleton class that represents the model of the game.
 * It contains all the information about the status of the Forest,
 * it is modified/accessed by all the states.
 */
export class Model {

    private static _instance: Model;
    private _trees: Tree[];
    private _leaves: number;
    private _globalExperience: number;
    private pathToJsonFile: string = "./server/gameState.json";

    private constructor() {
        console.log("Creating a new Model...")
        this._trees = []
        this._leaves = 0
        this._globalExperience = 0
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get trees(): Tree[] {
        return this._trees;
    }

    public addTree(position_x: number, position_y: number, level: number, experience: number) {
        this._trees.push(new Tree(position_x, position_y, level, experience))
        // TODO: add to Json file
    }

    public removeTree(id: string) {
        let j = 0;

        this._trees.forEach((tree, i) => {
            if (tree.id != id) {
                if (i !== j) this._trees[j] = tree;
                j++;
            }
        });

        this._trees.length = j;
        // TODO: remove from Json file
    }

    // TODO: make the reading a function to not duplicate code
    public updateGlobalExperience(experience: number) {

        fs.readFile(this.pathToJsonFile, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }

            const parsedData = JSON.parse(data.toString());
            this._globalExperience = experience;
            parsedData.globalExperience = experience;

            fs.writeFileSync(this.pathToJsonFile,
                JSON.stringify(parsedData, null, 2));
        });
    }
}
