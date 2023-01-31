import { Intents, NameStates, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~~/server/Model"
import { Position } from "~~/server/Position"
import { Tree } from "~~/server/Tree"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialGroupState extends MachineState {
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
        super.setAnswer("Let's finish this group action, try clicking on the 3 plants you want to group")
        return super.finalResponse
    }

    public groupAction(response: any, splitted: string[]): any {
        // try if group was ok and if yes return response with .success=true to move to next tutorial state
        let tree0 = new Tree(new Position(2, 2), 2, 1000)
        let tree1 = new Tree(new Position(3, 3), 2, 1000)
        let tree2 = new Tree(new Position(4, 4), 2, 1000)
        let planted1 = new Tree(new Position(1,1), 2, 1000)
        let planted2 = new Tree(new Position(6,6), 2, 1000)
        let planted3 = new Tree(new Position(1,6), 2, 1000)
        let planted4 = new Tree(new Position(6,1), 2, 1000)
        console.log("starting group")
        try {
            let pos1 = new Position(+splitted[0], +splitted[1])
            let pos2 = new Position(+splitted[2], +splitted[3])
            let pos3 = new Position(+splitted[4], +splitted[5])
            if(pos1.x+pos2.x+pos3.x!=9||pos1.y+pos2.y+pos3.y!=9){
                throw new Error("Invalid operation")
            }
            console.log("positions were right")
            //TODO check if positions are 22,33,44 if not throw exception
            let newTree = new Tree(new Position(3, 3), 3, 1000)
            //return to player board
            let answer = Model.Instance.initialBoardJson
            answer.removed = [tree0, tree1, tree2,planted1,planted2,planted3,planted4]
            response.data = answer;
            response.success = true;
            response.queryResult.fulfillmentText = "Congratulations, you succesfully grouped your plants. The tutorial is now over"
            return response
        } catch (e) {
            response.data = {
                trees: [],
                removed: [],
                group: [tree0, tree1, tree2],
            }
            response.success = false;
            response.queryResult.fulfillmentText = "I'm  sorry you need to select 3 different plants. Please try again"
            return response;
        }
    }
}
