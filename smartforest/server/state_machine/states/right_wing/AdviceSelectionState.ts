import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class AdviceSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        if (intent == Intents.advices_appliances_consumption) {
            //specific tree part
        } else if (intent == Intents.advices_energy_status) {
            //specific tree part
        } else if (intent == Intents.advices_start_specific_appliance) {
            //specific tree part
        }else if (intent == Intents.exit_intent) {
            super.setAnswer("Exiting")
            super.setNextState(statesMap.get(NameStates.UserPromptState)!)
        }  else {
            super.setDefaultAnswer()
            console.log("AdviceSelectionState could not detect intent:" + intent)
        }
        return super.finalResponse

    }
}
