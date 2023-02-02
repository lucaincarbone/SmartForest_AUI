import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {Model} from "~~/server/Model"
import { TutorialState } from "./TutorialState"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialAdviceState extends TutorialState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            case Intents.advices_general:{
                super.setAnswer("Well Done, you learned how to request advices!. At the moment i advice you to see your plants experience there might be a surprise, try saying: i want to see the level of experience of my plants")
                super.setNextState(statesMap.get(NameStates.TutorialAwait2State)!)
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
                super.setAnswer("Try asking me: I want receive some advice")
                break;
            } 
        }
        return super.finalResponse
    }
}
