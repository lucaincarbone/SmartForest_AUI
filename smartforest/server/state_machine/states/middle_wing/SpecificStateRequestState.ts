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
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        switch (intent) {
            case Intents.forest_status_overall_leaves: {
                super.setNextState(statesMap.get(NameStates.HowToSpendRequestState)!)
                break;
            }
            case Intents.forest_status_overall_numberTrees: {
                //not a state waiting for interaction
                break
            }
            case Intents.forest_status_overall_notifications: {
                //not a state waiting for interaction
                break
            }
            case Intents.forest_status_overall_levelExperience: {
                super.setNextState(statesMap.get(NameStates.StateRequestBottomState)!)
                break
            }
            default: {
                super.prepareResponseDefault("SpecificStateRequestState")
                break;
            }
        }
        return super.finalResponse
    }
}
