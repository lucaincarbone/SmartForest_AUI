import { Intents, NameStates, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~~/server/Model"
import { Position } from "~~/server/Position"
import { Tree } from "~~/server/Tree"
import { TutorialState } from "./TutorialState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialGroupState extends TutorialState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        //Given after succesfull group detected in click.post api
        //Move to userPrompt state
        if (phrase == "!Grouping succesfull!") {
            console.log("Tutorial Grouping has ended succesfully")
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
                super.setChanges({
                    trees: super.getMaxLevelTutorialTrees(),
                    removed: [],
                    group: super.getMaxLevelTutorialTrees(),
                    hide:  super.getMaxLevelTutorialTrees()
                })
                super.setAnswer("Let's finish this group action, try clicking on the 3 plants you want to group")
                // super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            default: {
                super.setAnswer("Let's finish this group action, try clicking on the 3 plants you want to group")
                break;
            }
        }
        return super.finalResponse
    }

    public groupAction(response: any, splitted: string[]): any {
        // try if group was ok and if yes return response with .success=true to move to next tutorial state
        try {
            let pos1 = new Position(+splitted[0], +splitted[1])
            let pos2 = new Position(+splitted[2], +splitted[3])
            let pos3 = new Position(+splitted[4], +splitted[5])
            if(pos1.x+pos2.x+pos3.x!=9||pos1.y+pos2.y+pos3.y!=9||pos1.x==pos2.x){
                throw new Error("Invalid operation")
            }
            //return to player board
            let answer = Model.Instance.initialBoardJson
            answer.removed = super.getAllPossibleTutorialTrees()
            response.data = answer;
            response.success = true;
            response.queryResult.fulfillmentText = `Congratulations, you succesfully grouped your plants. 
            The tutorial is now over, replay it by saying: I need the tutorial. Or to get more info ask me: Show me the guide`
            return response
        } catch (e) {
            response.data = {
                trees: [],
                removed: [],
                group:super.getMaxLevelTutorialTrees(),
            }
            response.success = false;
            response.queryResult.fulfillmentText = "I'm  sorry you need to select 3 different plants. Please try again"
            return response;
        }
    }
}
