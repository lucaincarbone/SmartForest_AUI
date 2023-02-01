import { Intents, NameStates, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~~/server/Model"

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
        answer.leaves=undefined;
        return answer
    }
}
