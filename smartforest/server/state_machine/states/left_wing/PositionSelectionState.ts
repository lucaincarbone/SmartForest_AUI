import {Intents} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class PositionSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<Map<string, string>> {
        //Parent class method returns the intent
        let fromDialogFlow: Map<string, string> = await super.prepareResponse(phrase)
        let intent: string = fromDialogFlow.get('intent')!
        let answer: string = fromDialogFlow.get('answer')!

        // if (intent == Utils.forest_management_buy_position) {
        //     super.setNextState(statesMap.get(NameStates.ActionSelectionState)!)
        // }
        // else{
        //     console.log("ActionSelectionState could not detect intent:"+intent)
        // }
        return fromDialogFlow

    }
}
