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
    let intent: string = await super.prepareResponse(phrase)
    // if(intent==Intents.advices_general){
    //     super.setNextState(new Actionselectionstate())
    // }
    return super.prepareResponse(phrase)
   
}
}