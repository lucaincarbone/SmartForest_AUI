import fs from 'fs';
import {Tree} from "~/server/Tree";
import {Position} from './Position';
import {PlantPlaces} from './state_machine/Utils';

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
    private _leavesCost = 10;
    private _groupExperience = 50
    private _maxLevel: number = 3;

    //TODO make initial numbers correct (leaves)
    private constructor() {
        console.log("Creating a new Model...")
        this._trees = []
        this._leaves = 50
        this._globalExperience = 0
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get trees(): Tree[] {
        return this._trees;
    }

    public buyTree(positionGeneral: string): boolean {
        if (this.canIBuyATree()) {
            try {
                let position: Position = this.getAPosition(positionGeneral)
                this.addTree(position, 1, 50)
                return true
            }
                // There is no free space on the whole board
            catch (e) {
                console.log(e);
                return false
            }
        }
        return false
    }

    /**
     * Check if enough leaves are available to buy
     * @returns true if the user has enough leaves
     */
    public canIBuyATree() {
        return this._leaves >= this._leavesCost;
    }

    /**
     * Return a free position where a tree can be planted
     * if no space is available in the selected place return a random free space
     * if no space is available in general return an error
     * @param positionGeneral macro position chosen by the user
     * @returns A free position or an error if everything is full
     */
    private getAPosition(positionGeneral: string) {
        let possiblePositions: Position[] = []
        let x_start, x_end, y_start, y_end

        switch (positionGeneral) {
            case PlantPlaces.RIGHT: {
                x_start = 4
                x_end = 6
                y_start = 4
                y_end = 6
                break;
            }
            case PlantPlaces.LEFT: {
                x_start = 1
                x_end = 3
                y_start = 1
                y_end = 3
                break;
            }
            case PlantPlaces.TOP: {
                x_start = 1
                x_end = 3
                y_start = 4
                y_end = 6
                break;
            }
            case PlantPlaces.BOTTOM: {
                x_start = 4
                x_end = 6
                y_start = 1
                y_end = 3
                break;
            }
            default: {
                x_start = 0
                x_end = 0
                y_start = 0
                y_end = 0
            }
        }

        for (let x = x_start; x <= x_end; x++) {
            for (let y = y_start; y <= y_end; y++) {
                if (this.checkFreePosition(x, y)) {
                    return new Position(x, y);
                }
            }
        }
        //no free position in selectect place
        for (let x = 1; x <= 6; x++) {
            for (let y = 1; y <= 6; y++) {
                if (this.checkFreePosition(x, y)) {
                    return new Position(x, y);
                }
            }
        }
        //no free position in general
        throw new Error('There is no space to plant a new tree');
    }

    /**
     * Check if a position is free
     * @param x desired x
     * @param y desired y
     * @returns true if free/ false if not
     */
    private checkFreePosition(x: number, y: number) {
        this.trees.forEach(tree => {
            if ((tree.position_x == x) && (tree.position_y == y)) {
                return false
            }
        });
        return true;
    }

    //TODO: to test!!
    public groupTrees(oldPositions: [Position, Position, Position]) {

        try {
            // If there is not a tree in that position, they throw an exception
            let firstTree = this.getSpecificTree(oldPositions[0])
            let secondTree = this.getSpecificTree(oldPositions[1])
            let thirdTree = this.getSpecificTree(oldPositions[2])

            // If the level constraints are not satisfied, it throws an exception
            this.checkLevel([firstTree, secondTree, thirdTree])

            oldPositions.forEach((position) => {
                this.removeTree(position)
            });

            let randomPosition = Math.floor(Math.random() * (3 + 1))
            this.addTree(oldPositions[randomPosition], firstTree.level, this._groupExperience)

        } catch (e) {
            console.error(e)
        }
    }

    public getSpecificTree(position: Position) {
        let tree = this._trees.find(tree => tree.position_x == position.x && tree.position_y == position.y)
        if (typeof tree !== 'undefined')
            throw new Error('In position ' + position.x + ", " + position.y + " there is not a tree");
        return tree!;
    }

    private checkLevel(trees: [Tree, Tree, Tree]) {
        if (trees[0].level == this._maxLevel || trees[1].level == this._maxLevel || trees[2].level == this._maxLevel) {
            throw new Error("A tree has yet the maximum level");
        } else if (!(trees[0].level == trees[1].level && trees[0].level == trees[2].level)) {
            throw new Error("The tress have not the same level");
        }
    }

    public addTree(position: Position, level: number, experience: number) {
        let treeToAdd = new Tree(position, level, experience)

        this._trees.push(treeToAdd)

        this.updateJsonFile({position: position, level: level, experience: experience},
            (parsedData, tree) => {
                parsedData.trees.push(tree);
            })
    }

    public removeTree(position: Position) {
        let j = 0;
        let indexOfTreeToRemove = 0;

        this._trees.forEach((tree, i) => {
            if (tree.position_x != position.x && tree.position_y != position.y) {
                if (i !== j) this._trees[j] = tree;
                j++;
            } else if (tree.position_x == position.x && tree.position_y == position.y) {
                indexOfTreeToRemove = i;
            }
        });
        this._trees.length = j;
        console.log(indexOfTreeToRemove)
        this.updateJsonFile([position.x, position.y], (parsedData, not_used) => {
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


