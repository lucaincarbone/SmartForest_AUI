import {Intents} from "../../Utils"
import {MachineState} from "../../MachineState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class PositionSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Parent class method returns the intent
        let fromDialogFlow = await super.prepareResponse(phrase)
        let intent: string = super.intentString
        let answer: string = super.answerString
        let parameters: any = super.parametersJson

        try {
            console.log(parameters.tree_position.toString())
        } catch (e) {
            console.error("NOT ABLE")
        }

        return fromDialogFlow
    }
}
