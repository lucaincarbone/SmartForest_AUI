import { Intents, NameStates, statesMap } from "../../Utils"
import { Model } from "~~/server/Model"
import { Position } from "~~/server/Position"
import { Tree } from "~~/server/Tree"
import { TutorialState } from "./TutorialState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialAwait2State extends TutorialState {
    private waitingForExp: boolean = true
    private askGroup:string = "Try asking me: I want to group some plants"
    private askExp:string = "Try asking me: I want to know the level of experience of my plants"
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            case Intents.forest_status_overall_levelExperience: {
                if (this.waitingForExp == true) {
                    //let's see the level of experience of the trees
                    let trees = super.getMaxLevelTutorialTrees()
                    super.setAllTrees(trees)
                    super.setAnswer("Well done, as you can see 3 of your plants are max level, let's try and group them, try saying i want to group some plants")
                    this.waitingForExp = false
                } else {
                    super.setAnswer(this.askGroup)
                }
                break;
            }
            //I want to group some plants
            case Intents.forest_management_group: {
                if (this.waitingForExp == false) {
                    super.setChanges({
                        trees: [],
                        removed: [],
                        group: super.getMaxLevelTutorialTrees(),
                    })
                    super.setAnswer("Well done, now let's click on the 3 plants we want to group")
                    this.waitingForExp = true;
                    super.setNextStateNoReset(statesMap.get(NameStates.TutorialGroupState)!)
                }
                else {
                    super.setAnswer(this.askExp)
                }
                break;
            }
            default: {
                if (this.waitingForExp == true) {
                    super.setAnswer(this.askExp)
                }
                else{
                    super.setAnswer(this.askGroup)
                }
                break;
            }
        }
        return super.finalResponse
    }
}
