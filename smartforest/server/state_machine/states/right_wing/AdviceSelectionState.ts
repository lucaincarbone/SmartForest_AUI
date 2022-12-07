import { Intents } from "../../intents"
import { MachineState } from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods 
 */
export class AdviceSelectionState extends MachineState{
 /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
  async prepareResponse(phrase:string): Promise<string>  {
    //Parent class method returns the intent 
    let promisedIntent: Promise<string> = super.prepareResponse(phrase)
    let intent: string = await promisedIntent
    if (intent == Intents.advices_applinces_consumption) {
      //specific tree part
    }
    else if (intent == Intents.advices_energy_status) {
      //specific tree part
    }
    else if (intent == Intents.advices_start_specific_appliance) {
      //specific tree part
    }
    else {
      console.log("AdviceSelectionState could not detect intent:" + intent)
    }
    return promisedIntent
   
}
}