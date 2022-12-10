import gameState from './gameState.json';
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

    private constructor() {
        console.log("Creating a new Model...")
        this._trees = []
        this._leaves = 0
        this._globalExperience = 0
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public addTree(position_x: number, position_y: number, level: number, experience: number) {
        this._trees.push(new Tree(position_x, position_y, level, experience))
        //this.updateJsonFile(); // TODO: to fix
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
        //this.updateJsonFile(); // TODO: to fix
    }

    // TODO: to fix
    // public updateExperience(experience: number) {
    //     this._globalExperience = experience;
    //     gameState.globalExperience = gameState.globalExperience + experience;
    //     this.updateJsonFile()
    // }

    get trees(): Tree[] {
        return this._trees;
    }

    // TODO: to fix?
    public updateJsonFile() {
        fs.writeFile("server/gameState.json", JSON.stringify(gameState), err => {
            if (err) console.log("Error writing file:", err);
        });
    }
}
