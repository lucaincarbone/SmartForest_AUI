import { Intents, NameStates, PlantPlaces, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~/server/Model";


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class PositionSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        if (intent == Intents.forest_management_buy_position) {
            try {
                let tree_position: string = super.tree_position
                if (!Model.Instance.buyTree(tree_position)) {
                    super.setAnswer("There is not enough space!" +
                        "Try to group 3 trees in order to free some space")
                }
                this.setChanges(Model.Instance.JsonWithChanges)
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
            } catch (e) {
                super.setAnswer("There is an error")
                console.error(e)
            }
        } else {
            super.setAnswer("From PositionSelectionState could not detect intent: " + intent)
            console.log("From PositionSelectionState could not detect intent: " + intent)
        }
        console.log(super.finalResponse)
        return super.finalResponse
    }
}
