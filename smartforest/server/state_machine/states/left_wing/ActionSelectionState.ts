import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {Model} from "~~/server/Model"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class ActionSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            case Intents.forest_management_buy:{
                if (Model.Instance.canIBuyATree()) {
                    super.setNextState(statesMap.get(NameStates.PositionSelectionState)!)
                } else {
                    super.setAnswer("Ops, you have not enough Leaves to buy a plant! Would you like to know how to get some?")
                    super.setNextState(statesMap.get(NameStates.TipRequestNoLeavesState)!)
                } 
                break;
            }
            //I want to group some plants
            case Intents.forest_management_group: {
                console.log(Intents.forest_management_group)
                if(Model.Instance.canIGroupTrees()){
                    super.setChanges(Model.Instance.JsonWithChanges)
                    super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                }
                else{
                    super.setAnswer(`You can't group any plant!
                    To group plants you need to have at least 3 trees with max. experience, at a level 1 or 2.
                    Would you like to know how to gain experience?`)
                    super.setNextState(statesMap.get(NameStates.TipRequestNoPlantsState)!)
                }
                break;
            }
            default:{
                super.prepareResponseDefault("ActionSelectionState")
                break;
            } 
        }
        return super.finalResponse
    }
}
