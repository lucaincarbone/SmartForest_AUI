import { Intents, NameStates, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~~/server/Model"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class GroupingState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Given after succesfull group detected in click.post api
        //Move to userPrompt state
        if(phrase=="!Grouping succesfull!"){
            console.log("Grouping has ended succesfully")
            super.setNextState(statesMap.get(NameStates.UserPromptState)!)
            return
        }
        //Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            //Need to undo possibility to click on specific plants
            // done by returning the tree lists as changes to the client
            case Intents.exit_intent: {
                Model.Instance.JsonWithChanges.trees=Model.Instance.JsonWithChanges.group
                Model.Instance.JsonWithChanges.group=Model.Instance.JsonWithChanges.removed
                super.setChanges(Model.Instance.JsonWithChanges)
                
                console.log("Aborting group")
                super.setAnswer("Aborting group action")
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            default: {
                super.prepareResponseDefault("I'm waiting for you to select the trees you want to group")
                break;
            }
        }
        return super.finalResponse
    }
}
