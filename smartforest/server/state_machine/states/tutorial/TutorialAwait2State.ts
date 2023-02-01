import { Intents, NameStates, statesMap } from "../../Utils"
import { Model } from "~~/server/Model"
import { Position } from "~~/server/Position"
import { Tree } from "~~/server/Tree"
import { TutorialState } from "./TutorialState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialAwait2State extends TutorialState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            //I want to group some plants
            case Intents.forest_management_group: {
                let tree0 = new Tree(new Position(2,2),2,1000)
                let tree1 = new Tree(new Position(3,3),2,1000)
                let tree2 = new Tree(new Position(4,4),2,1000)
                super.setChanges({
                    trees: [],
                    removed: [],
                    group: [tree0,tree1,tree2],
                })
                super.setAnswer("Well done, now let's click on the 3 plants we want to group")
                super.setNextStateNoReset(statesMap.get(NameStates.TutorialGroupState)!)
                break;
            }
            default:{
                super.setAnswer("Try asking me: I want to group some plants")
                break;
            }
        }
        return super.finalResponse
    }
}
