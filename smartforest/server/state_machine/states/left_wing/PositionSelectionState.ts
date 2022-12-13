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
        let fromDialogFlow = await super.prepareResponse(phrase)
        let intent: string = super.intentString
        let answer: string = super.answerString
        let parameters: any = super.parametersJson

        if (intent == Intents.forest_management_buy_position) {
            try {
                let tree_position: string = parameters.fields.tree_position.stringValue.toUpperCase()

                if (!Model.Instance.buyTree(tree_position)) {
                    fromDialogFlow.queryResult.fulfillmentText = "There is not enough space!" +
                        "Try to group 3 trees in order to free some space"
                }
                fromDialogFlow.changes = JSON.stringify(Model.Instance.JsonWithChanges)
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
            } catch (e) {
                console.error(e)
            }
        } else {
            console.log("From PositionSelectionState could not detect intent: " + intent)
        }
        console.log(fromDialogFlow)
        return fromDialogFlow
    }
}
