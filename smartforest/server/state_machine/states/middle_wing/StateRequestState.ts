import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class StateRequestState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            //A specific tree
            case Intents.forest_status_overall:{
                //TODO handle this part
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            //General Information
            case Intents.forest_status_specific: {
                super.setNextState(statesMap.get(NameStates.SpecificStateRequestState)!)
                break;
            }

            default: {
                super.prepareResponseDefault("StateRequestState")
                break;
            }
        }
        return super.finalResponse
    }
}
