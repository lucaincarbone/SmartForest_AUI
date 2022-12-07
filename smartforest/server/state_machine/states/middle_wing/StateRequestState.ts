import { Intents } from "../../intents"
import { MachineState } from "../../MachineState"
import { HowToSpendRequestState } from "./HowToSpendRequestState"
import { SpecificStateRequestState } from "./SpecificStateRequestState"


/**
 * Concrete state class that will redefine prepare response and change state methods 
 */
export class StateRequestState extends MachineState {
  /**
      * Using the received string prepares the appropriate json response by interacting with the dialogflow api
      */
  async prepareResponse(phrase: string): Promise<string> {
    //Parent class method returns the intent 
    let promisedIntent: Promise<string> = super.prepareResponse(phrase)
    let intent: string = await promisedIntent
    if (intent == Intents.forest_status_specific) {
      //specific tree part
    }
    else {
      console.log("StateRequestState could not detect intent:" + intent)
    }
    return promisedIntent

  }
}