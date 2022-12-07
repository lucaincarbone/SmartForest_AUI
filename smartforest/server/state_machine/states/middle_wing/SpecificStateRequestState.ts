import { Intents } from "../../intents"
import { MachineState } from "../../MachineState"
import { HowToSpendRequestState } from "./HowToSpendRequestState"
import { StateRequestBottomState } from "./StateRequestBottomState"


/**
 * Concrete state class that will redefine prepare response and change state methods 
 */
export class SpecificStateRequestState extends MachineState {
    /**
        * Using the received string prepares the appropriate json response by interacting with the dialogflow api
        */
    async prepareResponse(phrase: string): Promise<string> {
        //Parent class method returns the intent 
        let promisedIntent: Promise<string> = super.prepareResponse(phrase)
        let intent: string = await promisedIntent
        if (intent == Intents.forest_status_overall_leaves) {
            super.setNextState(new HowToSpendRequestState())
        }
        else if(intent == Intents.forest_status_overall_numberTrees){
           //not a status waiting for interaction
        }
        else if(intent == Intents.forest_status_overall_notifications){
           //not a status waiting for interaction
        }
        else if(intent == Intents.forest_status_overall_levelExperience){
           super.setNextState(new StateRequestBottomState())
        }
        else{
            console.log("SpecificStateRequestState could not detect intent:"+intent)
        }
        return promisedIntent

    }
}