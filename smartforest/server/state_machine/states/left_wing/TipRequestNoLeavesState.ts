import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TipRequestNoLeavesState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        if (intent == Intents.yes_answer) {
            super.setAnswer("Try to keep a green behavior (use clean energy) to get more Leaves. " +
            "A player has a green behavior when using clean energy instead of buying it from the station." +
            "The more Leaves you have, the more trees you plant!")
            super.setNextState(statesMap.get(NameStates.UserPromptState)!)

        } else if (intent == Intents.no_answer) {
            super.setAnswer("Okay, no problem")
            super.setNextState(statesMap.get(NameStates.UserPromptState)!)

        }else if (intent == Intents.exit_intent) {
            super.setAnswer("Exiting")
            super.setNextState(statesMap.get(NameStates.UserPromptState)!)
        }  else {
            super.setDefaultAnswer()
            console.log("TipRequestNoLeavesState could not detect intent:" + intent)
        }
        return super.finalResponse

    }
}
