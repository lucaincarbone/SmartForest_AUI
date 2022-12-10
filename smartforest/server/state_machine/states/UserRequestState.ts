import {Intents, NameStates, statesMap} from "../Utils";
import {MachineState} from "../MachineState";

/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class UserRequestState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<Map<string, string>> {
        // Parent class method returns the intent
        let fromDialogFlow: Map<string, string> = await super.prepareResponse(phrase)
        let intent: string = fromDialogFlow.get('intent')!
        let answer: string = fromDialogFlow.get('answer')!

        switch (intent) {
            case Intents.forest_management_general: {
                super.setNextState(statesMap.get(NameStates.ActionSelectionState)!)
                break;
            }
            case Intents.forest_status_general: {
                super.setNextState(statesMap.get(NameStates.StateRequestState)!)
                break;
            }
            case Intents.advices_general: {
                super.setNextState(statesMap.get(NameStates.AdviceSelectionState)!)
                break;
            }
            case Intents.guide_general: {
                console.log(Intents.guide_general)
                break;
            }
            default: {
                console.log("From UserPromptState could not detect intent: " + intent)
                break;
            }
        }

        return fromDialogFlow
    }
}
