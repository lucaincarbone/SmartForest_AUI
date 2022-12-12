import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import { Model } from "~~/server/Model"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class ActionSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        let fromDialogFlow = await super.prepareResponse(phrase)
        let intent: string = super.intentString
        let answer: string = super.answerString

        if (intent == Intents.forest_management_buy) {
            //TODO check if possible to buy
            //if yes    ->PositionSelectionState
            //if not    ->TipRequestNoLeavesState
            if(Model.Instance.canIBuyATree()){
                super.setNextState(statesMap.get(NameStates.PositionSelectionState)!)
            }
            else{
                //TODO not show the result
                super.setNextState(statesMap.get(NameStates.TipRequestNoLeavesState)!)
            }
        } else if (intent == Intents.forest_management_group) {
            //TODO this diramation within state machine need to be clarified
        } else {
            console.log("From ActionSelectionState could not detect intent:" + intent)
        }
        return fromDialogFlow

    }
}
