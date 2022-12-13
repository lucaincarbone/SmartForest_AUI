import fs from 'fs';
import {Tree} from "~/server/Tree";
import {Position} from './Position';
import {PlantPlaces} from './state_machine/Utils';

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

    //FIXME insert correct initial numbers
    private constructor() {
        if (fs.existsSync(this._pathToJsonFile)) {
            console.log("Loading the Model...")
            var jsonString = '{"some":"json"}';
            var jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2); 
            let data = fs.readFileSync(this._pathToJsonFile);
            const parsedData = JSON.parse(data.toString());

            this._leaves = parsedData.leaves;
            this._globalExperience = parsedData.globalExperience;
            let tree_list = parsedData.trees;

            this._trees = []

            for (let i = 0; i < tree_list.length; i++) {
                let position: Position = new Position(tree_list[i].position._x,tree_list[i].position._y);
                let level = tree_list[i].level;
                let experience = tree_list[i].experience;
                let tree: Tree = new Tree(position,level,experience);
                this._trees.push(tree);            
              }

            console.log(this._leaves);
            console.log(this._globalExperience);
            console.log(this._trees);

          } 
        else {
            // Load empty model if no previous json
            console.log("Creating a new Model...")
            this._trees = []
            this._leaves = 100
            this._globalExperience = 0
        }
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    get trees(): Tree[] {
        return this._trees;
    }

    /**
     * It permits to buy a new tree given the general position.
     * Note that the available leaves are not checked here!
     * This function adds the new tree and updates the leaves of the user.
     *
     * @param positionGeneral (TOP, BOTTOM, RIGHT, LEFT)
     * @exception if no space is available
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
     *
     * @returns true if the user has enough leaves
     */
    public canIBuyATree() {
        return this._leaves >= this._leavesCost;
    }

    /**
     * Return a free position where a tree can be planted
     * if no space is available in the selected place return a random free space
     * if no space is available in general return an error
     *
     * @param positionGeneral macro position chosen by the user
     * @returns A free position or an error if everything is full
     * @throws an exception if no space is available
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
     *
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

    /**
     * It groups 3 trees in a single one with level and experience equal to:
     * "the level of the trees + 1" and "this._newTreeExperience".
     * The position of the new tree is chosen randomly between
     * the position of the old trees.
     *
     * @param oldPositions the positions of the tree to group
     * @exception if the trees have not the same level
     * @exception if the trees have yet reach the max level
     * @exception if the trees have not reached the max experience
     * @exception if the tree is not found
     */
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

            this.addTree(newPosition, firstTree.level + 1, this._newTreeExperience)

        } catch (e) {
            console.error(e)
        }
    }

    /**
     * It returns the Tree object given the position
     *
     * @param position
     * @throws an exception if the tree is not found
     */
    public getSpecificTree(position: Position) {
        let tree = this._trees.find(tree => tree.position_x == position.x && tree.position_y == position.y)

        if (typeof tree == 'undefined')
            throw new Error('In position ' + position.x + ", " + position.y + " there is not a tree");

        return tree!;
    }

    /**
     * It checks the level of the trees
     *
     * @param trees the trees to check
     * @throws an exception if the trees have not the same level
     * @throws an exception if the trees have yet reach the max level
     */
    private checkLevel(trees: [Tree, Tree, Tree]) {

        if (!(trees[0].level == trees[1].level && trees[0].level == trees[2].level)) {
            throw new Error("The tress have not the same level");

        } else if (trees[0].level == this._maxLevel || trees[1].level == this._maxLevel
            || trees[2].level == this._maxLevel) {
            throw new Error("The trees has yet the maximum level");
        }
    }

    /**
     * It checks the experience of the trees
     *
     * @param trees the trees to check
     * @throws an exception if the trees have not reached the max experience
     */
    private checkExperience(trees: [Tree, Tree, Tree]) {

        if (!(trees[0].experience == this._maxTreeExperience && trees[1].experience == this._maxTreeExperience
            && trees[2].experience == this._maxTreeExperience)) {
            throw new Error("The tress have not the reach the max experience");
        }
    }

    /**
     * It adds a tree to the Json and to the model
     *
     * @param position the position of the new tree
     * @param level the level of the new tree
     * @param experience the experience of the new tree
     */
    public addTree(position: Position, level: number, experience: number) {
        let treeToAdd = new Tree(position, level, experience)

        this._trees.push(treeToAdd)
        this._jsonWithChanges.trees.push(treeToAdd)

        this.updateJsonFile({position: position, level: level, experience: experience},
            (parsedData, tree) => {
                parsedData.trees.push(tree);
            })
    }

    /**
     * It removes a tree from the Json and from the model
     *
     * @param position the position of the tree to remove
     */
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

    /**
     * It updates the global experience,
     * for now it just replace the old experience with the new one
     *
     * @param experience
     */
    public updateGlobalExperience(experience: number) {
        this._globalExperience = experience

        this.updateJsonFile(experience, (parsedData, experience) => {
            parsedData.globalExperience = experience;
        })
    }

    /**
     * It updates the number of leaves,
     * you can either add or remove them
     *
     * @param leaves the number of leaves to add/remove
     * @param isASum true if you want to add some leaves
     *               false if you want to remove them
     */
    public updateLeaves(leaves: number, isASum: boolean = false) {
        if (isASum) {
            this._leaves = this._leaves + leaves
            //update json to send back
            this._jsonWithChanges.leaves = this._leaves
            this.updateJsonFile(leaves, (parsedData, leaves) => {
                parsedData.leaves = parsedData.leaves + leaves;
            })
        } else {
            this._leaves = this._leaves - leaves < 0 ? 0 : this._leaves - leaves
            //update json to send back
            this._jsonWithChanges.leaves = this._leaves
            this.updateJsonFile(leaves, (parsedData, leaves) => {
                parsedData.leaves = parsedData.leaves - leaves;
            })
        }
    }

    /**
     * It updates the Json file
     *
     * @param dataToUpdate the data to update
     * @param func the function with the modifications to apply at the data
     * @private
     */
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

    public ResetJsonWithChanges(): void {
        this._jsonWithChanges = {
            trees: []
        };
    }

    /**
     * It initializes the Json file with an empty tree array
     * and with default values
     */
    public initializeJsonFile() {
        this.updateJsonFile({},
            (parsedData, tree) => {
                parsedData.trees = [];
                parsedData.globalExperience = 69;
                parsedData.globalExperience = 69;
            })
    }
}
