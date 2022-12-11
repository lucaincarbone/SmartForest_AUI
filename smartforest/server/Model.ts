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
        let treeToAdd = new Tree(position_x, position_y, level, experience)

        this._trees.push(treeToAdd)

        this.updateJsonFile({position_x: position_x, position_y: position_y, level: level, experience: experience},
            (parsedData, tree) => {
                parsedData.trees.push(tree);
            })
    }

    public removeTree(position_x: number, position_y: number) {
        let j = 0;
        let indexOfTreeToRemove = 0;

        this._trees.forEach((tree, i) => {
            if (tree.position_x != position_x && tree.position_y != position_y) {
                if (i !== j) this._trees[j] = tree;
                j++;
            } else if (tree.position_x == position_x && tree.position_y == position_y){
                indexOfTreeToRemove = i;
            }
        });
        this._trees.length = j;

        this.updateJsonFile([position_x, position_y], (parsedData, not_used) => {
            parsedData.trees.splice(indexOfTreeToRemove, 1);
        })
    }

    public updateGlobalExperience(experience: number) {
        this._globalExperience = experience

        this.updateJsonFile(experience, (parsedData, experience) => {
            parsedData.globalExperience = experience;
        })
    }

    public updateLeaves(leaves: number) {
        this._leaves = leaves

        this.updateJsonFile(leaves, (parsedData, leaves) => {
            parsedData.leaves = leaves;
        })
    }

    private updateJsonFile(dataToUpdate: any, func: (parsedData: any, data: any) => void) {

        let data = fs.readFileSync(this.pathToJsonFile);
        const parsedData = JSON.parse(data.toString());

        func(parsedData, dataToUpdate)

        fs.writeFileSync(this.pathToJsonFile,
            JSON.stringify(parsedData, null, 2));
    }
}


