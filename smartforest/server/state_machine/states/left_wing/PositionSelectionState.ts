import {Intents, NameStates, PlantPlaces, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {Model} from "~/server/Model";
import {Position} from "~/server/Position";


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
        switch (intent) {
            case Intents.forest_management_buy_position: {

                let tree_position: string = super.tree_position

                try {
                    Model.Instance.buyTree(tree_position)
                    this.setChanges(Model.Instance.JsonWithChanges)
                } catch (e: any) {
                    super.setAnswer(e.message)
                }

                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            default: {
                super.prepareResponseDefault("I'm waiting for you to tell me if you want to plant at the top, bottom, right or left")
                break;
            }
        }
        return super.finalResponse
    }
}
