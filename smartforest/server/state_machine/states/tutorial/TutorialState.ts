import { Intents, NameStates, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~~/server/Model"
import { Tree } from "~~/server/Tree";
import { Position } from "~~/server/Position";

/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export abstract class TutorialState extends MachineState {
    /**
     * Update current state but return empty changes json since player is playing the tutorial
     * @param totalGrade 
     * @param currentGrade 
     * @returns answer to be sent to the client
     */
    public updateGameStateGrade(totalGrade: number, currentGrade: number): any {
        Model.Instance.updateGameStateGrade(totalGrade, currentGrade)
        Model.Instance.ResetJsonWithChanges();
        let answer = Model.Instance.JsonWithChanges
        return answer
    }

    getMaxLevelTutorialTrees(){
        let tree0 = new Tree(new Position(2, 2), 2, 1000)
        let tree1 = new Tree(new Position(3, 3), 2, 1000)
        let tree2 = new Tree(new Position(4, 4), 2, 1000)
        return [tree0, tree1, tree2]
    }

    getAllPossibleTutorialTrees(){
        let tree0 = new Tree(new Position(2, 2), 2, 1000)
        let tree1 = new Tree(new Position(3, 3), 2, 1000)
        let tree2 = new Tree(new Position(4, 4), 2, 1000)
        let planted1 = new Tree(new Position(1,1), 2, 1000)
        let planted2 = new Tree(new Position(6,6), 2, 1000)
        let planted3 = new Tree(new Position(1,6), 2, 1000)
        let planted4 = new Tree(new Position(6,1), 2, 1000)
        return [tree0, tree1, tree2,planted1,planted2,planted3,planted4]
    }
}
