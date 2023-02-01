import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {Model} from "~~/server/Model"
import { TutorialState } from "./TutorialState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialPlantState extends TutorialState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            case Intents.forest_management_buy:{
                super.setAnswer("Well done, now let's choose a spot where to plant it: try saying plant it at the bottom, top, right, left.")
                super.setNextState(statesMap.get(NameStates.TutorialPositionSelectionState)!)
                break;
            }
            case Intents.exit_intent:{
                super.setAnswer("I'm glad to know you already know how to play the game, whad do you want to do?")
                let changes = Model.Instance.initialBoardJson
                changes.hide = super.getAllPossibleTutorialTrees()
                super.setChanges(changes)
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            default:{
                super.setAnswer("Try asking me: I want to plant a new tree")
                break;
            } 
        }
        return super.finalResponse
    }
}
