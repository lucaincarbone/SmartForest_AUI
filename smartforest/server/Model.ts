import fs from 'fs';
import {Tree} from "~/server/Tree";
import {Position} from './Position';
import {PlantPlaces} from './state_machine/Utils';
import {LoaderResponse, ModelLoader} from '~/server/ModelLoader'
import {NotificationsManager} from './notifications/NotificationsManager';

interface JsonWithChanges {
    leaves?: number,
    globalExperience?: number,
    // wantGroup?: boolean
    trees: Tree[],
    removed: Tree[],
    group: Tree[],
    error: string,
    last_notification: string
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
    private _leavesCost = 1000;
    private _newTreeExperience = 500;
    private _maxTreeExperience = 1000;
    private _startedTreeLevel = 1;
    private _maxLevel: number = 3;
    private badThreshold: number = 30;
    private middleThreshold: number = 70;
    private highThreshold: number = 100;
    private weightTree1: number = 1;
    private weightTree2: number = 4;
    private weightTree3: number = 16;
    private _jsonWithChanges: JsonWithChanges = {
        trees: [],
        removed: [],
        group: [],
        error: "",
        last_notification: "🌱 No new notifications. 🌱"
    };
    private notificationManager: NotificationsManager;

    private constructor() {
        if (fs.existsSync(this._pathToJsonFile)) {
            console.log("Loading the Model...")
            let loaderResponse: LoaderResponse = ModelLoader.Instance.loadData();
            this._leaves = loaderResponse.leaves;
            this._globalExperience = loaderResponse.globalExperience;
            this._trees = loaderResponse.trees;
            // console.log("Model loaded")
            // console.log(this._leaves);
            // console.log(this._globalExperience);
            // console.log(this._trees);
        } else {
            // Load empty model if no previous json
            console.log("Creating a new Model...")
            this._trees = []
            this._leaves = 100
            this._globalExperience = 0
        }
        this.notificationManager = new NotificationsManager(5, ModelLoader.Instance.loadNotifications())
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * It permits to buy a new tree given the general position.
     * Note that the available leaves are not checked here!
     * This function adds the new tree and updates the leaves of the user.
     *
     * @param positionGeneral (TOP, BOTTOM, RIGHT, LEFT)
     */
    public buyTree(positionGeneral: string) {
        let position: Position = this.getAPosition(positionGeneral)
        this.addTree(position, this._startedTreeLevel, this._newTreeExperience)
        this.updateLeaves(this._leavesCost)
        this.addNewNotice("You planted a new tree at the " + positionGeneral.toLowerCase(), true)
    }

    /**
     * Tell notificationManager to add a new notification
     * @param text text of the notification
     * @param good if the notification is good
     */
    private addNewNotice(text: string, good: boolean) {
        this._jsonWithChanges.last_notification = text
        this.notificationManager.AddNewNotice(text, good)
    }

    /**
     * Check if enough leaves are available to buy
     *
     * @returns true if the user has enough leaves
     */
    public canIBuyATree(): boolean {
        return this._leaves >= this._leavesCost;
    }

    /**
     * Check if there are trees that can be grouped together right now
     * @returns true if there are
     */
    public canIGroupTrees(): boolean {
        let nTreesForLevel = [0, 0]
        let maxExpTrees = this._trees.filter(tree => tree.experience == this._maxTreeExperience || tree.level == 3)
        maxExpTrees.forEach(tree => nTreesForLevel[tree.level - 1]++)
        let answer = nTreesForLevel.filter(num => num >= 3).length > 0
        if (answer) {
            // this._jsonWithChanges.wantGroup = true
            maxExpTrees.filter(tree => nTreesForLevel[tree.level - 1] >= 3).forEach(tree => this._jsonWithChanges.group.push(tree))
        }
        return answer
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
                throw new Error("Can't detect the requested position")
            }
        }
        for (let x = x_start; x <= x_end; x++) {
            for (let y = y_start; y <= y_end; y++) {
                if (this.checkFreePosition(x, y)) {
                    return new Position(x, y);
                }
            }
        }
        // No free position in selected place
        for (let x = 1; x <= 6; x++) {
            for (let y = 1; y <= 6; y++) {
                if (this.checkFreePosition(x, y)) {
                    return new Position(x, y);
                }
            }
        }
        // No free position in general
        throw new Error("There is not enough space! Try to group 3 trees in order to free some space");
    }

    /**
     * Check if a position is free
     *
     * @param x desired x
     * @param y desired y
     * @returns true if free/ false if not
     */
    private checkFreePosition(x: number, y: number) {
        let free: boolean = true
        this._trees.forEach(tree => {
            if ((tree.position_x == x) && (tree.position_y == y)) {
                free = false
                return
            }
        });
        return free;
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
     * @returns true if the plants were grouped succesfully
     */
    public groupTrees(oldPositions: [Position, Position, Position]) {
        // If there is not a tree in that position, they throw an exception
        let firstTree = this.getSpecificTree(oldPositions[0])
        let secondTree = this.getSpecificTree(oldPositions[1])
        let thirdTree = this.getSpecificTree(oldPositions[2])
        // If the level constraints are not satisfied, it throws an exception
        this.checkLevel([firstTree, secondTree, thirdTree])
        // If the trees have not reached the max experience, it throws an exception
        this.checkExperience([firstTree, secondTree, thirdTree])
        // If the User chose some equal positions, it throws an exception
        this.checkPositions(oldPositions)

        oldPositions.forEach((position) => {
            this.removeTree(position)
        });

        let randomPosition = Math.floor(Math.random() * 3);
        let newPosition = oldPositions[randomPosition]
        this.addTree(newPosition, firstTree.level + 1, this._newTreeExperience)
        this.addNewNotice("You successfully grouped 3 threes of level " + firstTree.level, true)
        return true;

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
            throw new Error("The trees do not have the same level");

        } else if (trees[0].level == this._maxLevel || trees[1].level == this._maxLevel
            || trees[2].level == this._maxLevel) {
            throw new Error("You cannot merge trees of level 3");
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
            throw new Error("The selected trees must have max experience");
        }
    }

    /**
     * It checks if the user chose equal positions
     *
     * @param positions the position of the trees
     * @throws an exception if there is some equal positions
     */
    private checkPositions(positions: [Position, Position, Position]) {
        if ((positions[0].x == positions[1].x && positions[0].y == positions[1].y)
            || (positions[0].x == positions[2].x && positions[0].y == positions[2].y)
            || (positions[1].x == positions[2].x && positions[1].y == positions[2].y)) {
            throw new Error("You need to select 3 different trees");
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

        let indexOfTreeToRemove = this._trees.findIndex(tree => tree.position_x === position.x && tree.position_y === position.y);

        if (indexOfTreeToRemove > -1) {
            this._trees.splice(indexOfTreeToRemove, 1);
        }

        this._jsonWithChanges.removed.push(new Tree(position, 0, 0))

        this.updateJsonFile(position, (parsedData, position) => {
            let indexOfTreeToRemove = 0;

            indexOfTreeToRemove = parsedData.trees.findIndex(function (tree: any) {
                return tree.position._x === position.x && tree.position._y === position.y;
            });

            if (indexOfTreeToRemove > -1) {
                parsedData.trees.splice(indexOfTreeToRemove, 1);
            }
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
    public updateJsonFile(dataToUpdate: any, func: (parsedData: any, data: any) => void) {

        let data = fs.readFileSync(this._pathToJsonFile);
        const parsedData = JSON.parse(data.toString());

        func(parsedData, dataToUpdate)

        fs.writeFileSync(this._pathToJsonFile,
            JSON.stringify(parsedData, null, 2));
    }


    /**
     * Getter for the Json with changes to send to the client
     */
    get JsonWithChanges(): JsonWithChanges {
        return this._jsonWithChanges;
    }

    /**
     * Getter for the full tree list
     */
    get trees() {
        return this._trees;
    }

    /**
     * Return a jsonWithChanges with all the data used for first load of client
     */
    get initialBoardJson(): any {
        let initial: JsonWithChanges = {
            leaves: this._leaves,
            globalExperience: this._globalExperience,
            trees: this._trees,
            removed: [],
            group: [],
            error: "",
            last_notification: "🌱 No new notifications. 🌱"
        };
        return initial
    }

    /**
     * Reset the JsonWithChanges
     */
    public ResetJsonWithChanges(): void {
        this._jsonWithChanges = {
            trees: [],
            removed: [],
            group: [],
            error: "",
            last_notification: "🌱 No new notifications. 🌱"
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

    /**
     * Method used to query the number of leaves the player owns
     *
     * @returns the number of owned leaves
     */
    public getNoOfLeaves(): number {
        return this._leaves
    }

    /**
     * Method used to query the number of trees the player owns
     * return an array of 4 number:
     * pos 0 is the number of trees, pos 1 to 3 are the number of trees of that level
     *
     * @returns the number array of length 4
     */
    public getNoOfTrees(): number[] {
        let level = [0, 0, 0, 0]
        this._trees.forEach(function (arrayItem) {
            var x = arrayItem.level;
            level[0]++
            level[x] += 1
        });
        return level
    }

    /**
     * Return the global experience
     * @returns global experience
     */
    public getLevelexperience(): number {
        return this._globalExperience;
    }

    /**
     * Explode a tree with 0 exp in 2 of lesser level or only delete if level 1
     * @param tree
     */
    private explodeTree(tree: Tree) {

        // Just remove the tree with level equal to 1
        if (tree.level == this._startedTreeLevel) {

            this.removeTree(new Position(tree.position_x, tree.position_y))

            // Remove the tree and add 2 new trees with level decreased by 1
        } else {

            let positionFirstPlant = new Position(tree.position_x, tree.position_y)
            this.removeTree(positionFirstPlant)
            this.addTree(positionFirstPlant, tree.level - 1, this._newTreeExperience)

            let positions = []
            let positionSecondPlant = null

            for (let x = 1; x <= 6; x++) {
                for (let y = 1; y <= 6; y++) {
                    if (this.checkFreePosition(x, y)) {
                        positions.push(new Position(x, y))
                    }
                }
            }

            // No free position is found
            if (positions.length == 0) {
                // FIXME
                this._jsonWithChanges.error = "There is no space to plant the generated tree"
            } else {
                positionSecondPlant = positions[Math.floor(Math.random() * positions.length)];
                this.addTree(positionSecondPlant, tree.level - 1, this._newTreeExperience)
            }
        }
    }

    /**
     * Update tree exp in json
     * @param updatedExperience new exp
     * @param position position of the tree
     */
    private updateTreeExpOnJson(updatedExperience: number, position: Position) {
        this.updateJsonFile({exp: updatedExperience, pos: position},
            (parsedData, obj) => {

                let indexOfTreeToUpdate = 0;

                indexOfTreeToUpdate = parsedData.trees.findIndex(function (tree: any) {
                    return tree.position._x === obj.pos.x && tree.position._y === obj.pos.y;
                });

                let treeToUpdate = parsedData.trees[indexOfTreeToUpdate];
                treeToUpdate.experience = obj.exp
            })
    }

    /**
     * Update the game state based on totalGrade and currentGrade
     * @param totalGrade
     * @param currentGrade
     */
    public updateGameStateGrade(totalGrade: number, currentGrade: number) {
        this.ResetJsonWithChanges();
        let self = this;
        let toRemove: Array<Tree> = [];

        this.updateLeavesBasedOnForestStatus(totalGrade, currentGrade)
        //TODO merge this part with the one below (carefull the add notice must not be in the forEach!!)
        let weighted = (0.8 * totalGrade + 0.2 * currentGrade);
        console.log("WEIGHTED For Plant Exp: " + weighted);
        if (weighted <= self.badThreshold) {
            this.addNewNotice("Your plants were harmed due to your bad behaviour", false)
        } else if (weighted <= self.middleThreshold) {
            this.addNewNotice("Well done, you maintained a green behaviour", true)
        } else {
            this.addNewNotice("You maintained an excellent green behaviour, your plants are happy", true)
        }
        this._trees.forEach(function (tree) {
            let exp = tree.experience;

            if (weighted <= self.badThreshold) {
                exp -= self.highThreshold - weighted;
            } else if (weighted <= self.middleThreshold) {
                exp += weighted;
            } else {
                exp += self.highThreshold;
            }

            let temp_exp = Math.round(exp);
            exp = Math.min(temp_exp, self._maxTreeExperience);
            tree.experience = exp;
            self.updateTreeExpOnJson(exp, new Position(tree.position_x, tree.position_y));

            if (exp <= 0) {
                toRemove.push(tree)
            }
        });
        if (toRemove.length > 0) {
            let nLost = 0
            toRemove.forEach(function (tree) {
                console.log("exploding tree: " + tree.position_x + " " + tree.position_y)
                self.explodeTree(tree)
                nLost++;
            })
            this.addNewNotice("Unfortunately " + nLost + " plant(s) suffered for your excessive consumption", false)
        }

    }

    /**
     * Update the leaves number based on the owned trees and totalGrade and currentGrade
     * @param totalGrade
     * @param currentGrade
     */
    public updateLeavesBasedOnForestStatus(totalGrade: number, currentGrade: number) {

        let nTrees1 = 0;
        let nTrees2 = 0;
        let nTrees3 = 0;
        let weighted = 0.08 * currentGrade + 0.02 * totalGrade

        this._trees.forEach(function (tree) {
            if (tree.level == 1) {
                nTrees1++;
            } else if (tree.level == 2) {
                nTrees2++;
            } else if (tree.level == 3) {
                nTrees3++;
            }
        })

        let newLeavesToAdd = weighted + (nTrees1 * this.weightTree1 + nTrees2 * this.weightTree2 + nTrees3 * this.weightTree3);
        this.updateLeaves(Math.round(newLeavesToAdd), true)
        this.addNewNotice("You gained " + Math.round(newLeavesToAdd) + " leaves", true);
    }

    /**
     * Get the number of currently stored past notifications
     */
    public getNumberOfStoredNotifications(): number {
        return this.notificationManager.NotificationsNumber;
    }

    /**
     * Get the currently stored past notifications
     */
    public getLastNotifications() {
        return this.notificationManager.NotificationsList;
    }
}
