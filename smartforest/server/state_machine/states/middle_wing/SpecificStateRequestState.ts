import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class SpecificStateRequestState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        let fromDialogFlow = await super.prepareResponse(phrase)
        let intent: string = super.intentString
        let answer: string = super.answerString

        if (intent == Intents.forest_status_overall_leaves) {
            super.setNextState(statesMap.get(NameStates.HowToSpendRequestState)!)
        } else if (intent == Intents.forest_status_overall_numberTrees) {
            //not a status waiting for interaction
        } else if (intent == Intents.forest_status_overall_notifications) {
            //not a status waiting for interaction
        } else if (intent == Intents.forest_status_overall_levelExperience) {
            super.setNextState(statesMap.get(NameStates.StateRequestBottomState)!)
        } else {
            console.log("SpecificStateRequestState could not detect intent:" + intent)
        }
        return fromDialogFlow

    }
}
