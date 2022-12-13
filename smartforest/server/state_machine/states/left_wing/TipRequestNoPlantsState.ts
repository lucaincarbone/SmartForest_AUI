import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"

/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TipRequestNoPlantsState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        if (intent == Intents.yes_answer) {
            //not a state waiting for interaction
        } else if (intent == Intents.no_answer) {
            //not a state waiting for interaction
        }else if (intent == Intents.exit_intent) {
            super.setAnswer("Exiting")
            super.setNextState(statesMap.get(NameStates.UserPromptState)!)
        }  else {
            super.setDefaultAnswer()
            console.log("TipRequestNoPlantsState could not detect intent:" + intent)
        }
        return super.finalResponse

    }
}
