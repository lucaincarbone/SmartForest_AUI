import { Intents, NameStates, PlantPlaces, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~/server/Model";
import { Tree } from "~~/server/Tree";
import { Position } from "~~/server/Position";
import { TutorialState } from "./TutorialState";


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialPositionSelectionState extends TutorialState {
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
                let x, y;
                switch (tree_position) {
                    case PlantPlaces.RIGHT: {
                        x = 6
                        y = 6
                        break;
                    }
                    case PlantPlaces.LEFT: {
                        x = 1
                        y = 1
                        break;
                    }
                    case PlantPlaces.TOP: {
                        x = 1
                        y = 6
                        break;
                    }
                    case PlantPlaces.BOTTOM: {
                        x = 6
                        y = 1
                        break;
                    }
                    default: {
                        super.setAnswer("That is not a valid position, try saying: plant it at the top,bottom,left,right")
                        return super.finalResponse;
                    }
                }
                let tree = new Tree(new Position(x, y), 1, 50)
                super.setAnswer("Well Done, you learned how to plant a new tree!. Now let's try and see your last notifications, try saying: i want to see my last notifications")
                super.setChanges({
                    trees: [tree],
                    removed: [],
                    group: [],
                    leaves: 0
                })
                super.setNextState(statesMap.get(NameStates.TutorialNotificationState)!)
                break;
            }
            default: {
                super.setAnswer("I'm waiting for you to tell me if you want to plant at the top, bottom, right or left")
                break;
            }
        }
        return super.finalResponse
    }
}
