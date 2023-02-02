import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {Model} from "~~/server/Model"
import { TutorialState } from "./TutorialState"
import { Notice } from "~~/server/notifications/Notice"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class TutorialNotificationState extends TutorialState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString
        switch (intent) {
            case Intents.forest_status_overall_notifications:{
                super.setAnswer("Well done, now let's see which advices i could give you, try saying: I want receive some advice")
                let notice = new Notice("Planted a new tutorial plant",true,"Right now")
                super.setNotificationsList([notice])
                super.setNextState(statesMap.get(NameStates.TutorialAdviceState)!)
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
                super.setAnswer("Try asking me: I want to know my last notifications")
                break;
            } 
        }
        return super.finalResponse
    }
}
