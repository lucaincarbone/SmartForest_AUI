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
        //TODO do this part with api help
        switch (intent) {
            //Which are the devices that are consuming the most ?
            case Intents.advices_appliances_consumption: {
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            //Tell me how much energy I have available inside the battery
            case Intents.advices_energy_status: {
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            //Can I start the washing machine ?
            case Intents.advices_start_specific_appliance: {
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            default: {
                super.prepareResponseDefault("StateRequestBottom")
                break;
            }
        }
        return super.finalResponse




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
