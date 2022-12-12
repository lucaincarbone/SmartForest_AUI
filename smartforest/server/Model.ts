import fs from 'fs';
import { Tree } from "~/server/Tree";
import { Position } from './Position';
import { PlantPlaces } from './state_machine/Utils';

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


    public buyTree(positionGeneral: PlantPlaces): boolean {
        if (this.canIBuyATree()) {
            try {
                let position: Position = this.getAPosition(positionGeneral)
                this.addTree(position, 1, 50)
                return true
            }
            //There is no free space on the whole board
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
    private getAPosition(positionGeneral: PlantPlaces) {
        let possiblePositions: Position[] = []
        let x_start, x_end, y_start, y_end
        switch (positionGeneral) {
            case PlantPlaces.right: {
                x_start = 4
                x_end = 6
                y_start = 4
                y_end = 6
                break;
            }
            case PlantPlaces.left: {
                x_start = 1
                x_end = 3
                y_start = 1
                y_end = 3
                break;
            }
            case PlantPlaces.top: {
                x_start = 1
                x_end = 3
                y_start = 4
                y_end = 6
                break;
            }
            case PlantPlaces.bottom: {
                x_start = 4
                x_end = 6
                y_start = 1
                y_end = 3
                break;
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

    // public groupTrees(oldPositions: [Position, Position, Position]) {
    //
    //     let firstTree = this.getSpecificTree(oldPositions[0])!
    //     let secondTree = this.getSpecificTree(oldPositions[1])!
    //     let thirdTree = this.getSpecificTree(oldPositions[2])!
    //
    //     if (firstTree.level == secondTree.level && firstTree.level == thirdTree.level) {
    //
    //     }
    //
    //     oldPositions.forEach((position) => {
    //         let selectedTree = this.getSpecificTree(position)
    //         if (selectedTree)
    //             this.removeTree(position)
    //     });
    //     let randomPosition = Math.floor(Math.random() * (3 + 1))
    //     this.addTree(oldPosition[randomPosition], )
    //
    // }
    //
    // public getSpecificTree(position: Position) {
    //     return this._trees.find(tree => tree.position_x == position.x && tree.position_y == position.y)
    // }
    //
    // public canIGroup(position: Position) {
    //     let treeToGroup = this.getSpecificTree(position)!
    //
    //     if (treeToGroup.experience < this._maxTreeExperience) {}
    // }

    public addTree(position: Position, level: number, experience: number) {
        let treeToAdd = new Tree(position, level, experience)

        this._trees.push(treeToAdd)

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
        console.log(indexOfTreeToRemove)
        this.updateJsonFile([position.x, position.y], (parsedData, not_used) => {
            parsedData.trees.splice(indexOfTreeToRemove, 1);
        })
    }

    public groupTrees(OldPositions: [Position, Position, Position], newPosition: Position) {

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


