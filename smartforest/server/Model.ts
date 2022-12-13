import fs from 'fs';
import { Tree } from "~/server/Tree";
import { Position } from './Position';
import { PlantPlaces } from './state_machine/Utils';

interface JsonWithChanges {
    leaves?: number,
    globalExperience?: number,
    trees: Tree[]
}

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
    private _pathToJsonFile: string = "./server/gameState.json";
    private _leavesCost = 10;
    private _newTreeExperience = 50;
    private _maxTreeExperience = 1000;
    private _startedTreeLevel = 1;
    private _maxLevel: number = 3;
    private _jsonWithChanges: JsonWithChanges = {
        trees: []
    };


    //TODO make initial numbers correct (leaves)
    private constructor() {
        console.log("Creating a new Model...")
        this._trees = []
        this._leaves = 100
        this._globalExperience = 0
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get trees(): Tree[] {
        return this._trees;
    }

    /**
     * Return false if there is no space in the board
     * @param positionGeneral
     */
    public buyTree(positionGeneral: string): boolean {
        try {
            let position: Position = this.getAPosition(positionGeneral)
            this.addTree(position, this._startedTreeLevel, this._newTreeExperience)
            this.updateLeaves(this._leavesCost)
            return true
        }
        // There is no free space on the whole board
        catch (e) {
            console.log(e);
            return false
        }
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
        // No free position in selectect place
        for (let x = 1; x <= 6; x++) {
            for (let y = 1; y <= 6; y++) {
                if (this.checkFreePosition(x, y)) {
                    return new Position(x, y);
                }
            }
        }
        // No free position in general
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

            // If the trees have not reached the max experience, it throws an exception
            this.checkExperience([firstTree, secondTree, thirdTree])

            oldPositions.forEach((position) => {
                this.removeTree(position)
            });

            let randomPosition = Math.floor(Math.random() * 3);
            let newPosition = oldPositions[randomPosition]

            this.addTree(newPosition, firstTree.level, this._newTreeExperience)

        } catch (e) {
            console.error(e)
        }
    }

    public getSpecificTree(position: Position) {
        let tree = this._trees.find(tree => tree.position_x == position.x && tree.position_y == position.y)

        if (typeof tree == 'undefined')
            throw new Error('In position ' + position.x + ", " + position.y + " there is not a tree");

        return tree!;
    }

    private checkLevel(trees: [Tree, Tree, Tree]) {

        if (!(trees[0].level == trees[1].level && trees[0].level == trees[2].level)) {
            throw new Error("The tress have not the same level");

        } else if (trees[0].level == this._maxLevel || trees[1].level == this._maxLevel
            || trees[2].level == this._maxLevel) {
            throw new Error("The trees has yet the maximum level");
        }
    }

    private checkExperience(trees: [Tree, Tree, Tree]) {

        if (!(trees[0].experience == this._maxTreeExperience && trees[1].experience == this._maxTreeExperience
            && trees[2].experience == this._maxTreeExperience)) {
            throw new Error("The tress have not the reach the max experience");
        }
    }

    public addTree(position: Position, level: number, experience: number) {
        let treeToAdd = new Tree(position, level, experience)

        this._trees.push(treeToAdd)
        this._jsonWithChanges.trees.push(treeToAdd)

        this.updateJsonFile({ position: position, level: level, experience: experience },
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

    /**
     *
     * @param leaves the number of leaves to add/remove
     * @param isASum true if you want to add some leaves
     *               false if you want to remove them
     */
    public updateLeaves(leaves: number, isASum: boolean = false) {
        if (isASum) {
            this._leaves = this._leaves + leaves
            //update json to send back
            this._jsonWithChanges.leaves=this._leaves
            this.updateJsonFile(leaves, (parsedData, leaves) => {
                parsedData.leaves = parsedData.leaves + leaves;
            })
        } else {
            this._leaves = this._leaves - leaves < 0 ? 0 : this._leaves - leaves
            //update json to send back
            this._jsonWithChanges.leaves=this._leaves
            this.updateJsonFile(leaves, (parsedData, leaves) => {
                parsedData.leaves = parsedData.leaves - leaves;
            })
        }
    }

    private updateJsonFile(dataToUpdate: any, func: (parsedData: any, data: any) => void) {

        let data = fs.readFileSync(this._pathToJsonFile);
        const parsedData = JSON.parse(data.toString());

        func(parsedData, dataToUpdate)

        fs.writeFileSync(this._pathToJsonFile,
            JSON.stringify(parsedData, null, 2));
    }


    get JsonWithChanges(): JsonWithChanges {
        return this._jsonWithChanges;
    }

    public ResetJsonWithChanges():void {
        this._jsonWithChanges = {
            trees: []
        };
    }
}
