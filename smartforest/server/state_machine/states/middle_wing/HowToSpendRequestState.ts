import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class HowToSpendRequestState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        switch (intent) {
            case Intents.yes_answer: {
                //not a state waiting for interaction
                break;
            }
            case Intents.no_answer: {
                //not a state waiting for interaction
                break
            }
            default: {
                super.prepareResponseDefault("HowToSpendRequestState")
                break;
            }
        }
        return super.finalResponse
    }
}
