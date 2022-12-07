import { Intents } from "../intents";
import { MachineState } from "../MachineState";
import { UserRequestState } from "./UserRequestState";

/**
 * Concrete state class that will redefine prepare response and change state methods 
 */
export class UserPromptState extends MachineState {
    /**
        * Using the received string prepares the appropriate json response by interacting with the dialogflow api
        */
    async prepareResponse(phrase: string): Promise<string> {
        //Parent class method returns the intent 
        let promisedIntent: Promise<string> = super.prepareResponse(phrase)
        let intent: string = await promisedIntent
        if (intent == Intents.Welcome_Flora) {
            super.setNextState(new UserRequestState())
        }
        else{
            console.log("UserPromptState could not detect intent:"+intent)
        }
        return promisedIntent
    }

}