import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class StateRequestBottomState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        switch (intent) {
            case Intents.yes_answer: {
                //TODO implement this
                super.setAnswer("This is not yet implemented")
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            case Intents.no_answer: {
                super.setAnswer("Okay, no problem. Can i do anything else for you?")
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            default: {
                super.prepareResponseDefault("StateRequestBottom")
                break;
            }
        }
        return super.finalResponse
    }
}
