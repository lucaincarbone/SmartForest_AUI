import {Intents, NameStates, PlantPlaces, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {Model} from "~/server/Model";


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

        try {
            let tree_position : string = parameters.fields.tree_position.stringValue.toUpperCase()

            if (Model.Instance.buyTree(tree_position)) {
                console.log("Tree planted")
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
            } else {
                console.log("Try again")
            }
        } catch (e) {
            console.error(e)
        }

        return fromDialogFlow
    }
}
