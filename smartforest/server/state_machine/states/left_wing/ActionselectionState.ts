import { Intents } from "../../intents"
import { MachineState } from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods 
 */
export class ActionSelectionState extends MachineState {
    /**
        * Using the received string prepares the appropriate json response by interacting with the dialogflow api
        */
    async prepareResponse(phrase: string): Promise<string> {
        //Parent class method returns the intent 
        let promisedIntent: Promise<string> = super.prepareResponse(phrase)
        let intent: string = await promisedIntent
        if (intent == Intents.forest_management_buy) {
            //TODO check if possible to buy
            //if yes    ->PositionSelectionState
            //if not    ->TipRequestNoLeavesState
        }
        else if(intent == Intents.forest_management_group){
            //TODO this diramation within state machine need to be clarified
        }
        else{
            console.log("ActionSelectionState could not detect intent:"+intent)
        }
        return promisedIntent

    }
}