import { Intents, NameStates, statesMap } from "../../Utils"
import { MachineState } from "../../MachineState"
import { Model } from "~~/server/Model"


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class SpecificStateRequestState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        switch (intent) {
            //How many leaves do i have
            case Intents.forest_status_overall_leaves: {
                let x = Model.Instance.getNoOfLeaves()
                super.setAnswer("You have " + x + " leaves in your forest")
                super.setNextState(statesMap.get(NameStates.HowToSpendRequestState)!)
                break;
            }
            //Show me how many trees i have
            case Intents.forest_status_overall_numberTrees: {
                let x = Model.Instance.getNoOfTrees()
                super.setAnswer(`You have  ${x[0]} trees in your forest. Of this trees ${x[1]} are level 1, ${x[2]} are level 2, ${x[3]} are level 3`)
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            //Which are my last notifications
            case Intents.forest_status_overall_notifications: {
                let n = Model.Instance.getNumberOfStoredNotifications()
                if (n == 0) {
                    super.setAnswer("You have no notifications to show");
                } else {
                    super.setAnswer("Here are your last " + n + " notifications");
                    super.setNotificationsList(Model.Instance.getLastNotifications())
                }
                break
            }
            //let's see the level of experience of the trees
            case Intents.forest_status_overall_levelExperience: {
                let trees = Model.Instance.trees
                super.setAllTrees(trees)
                super.setAnswer("Here is the experience level of all your trees")
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            default: {
                super.prepareResponseDefault("I'm waiting for you to ask me one of the following: How many leaves do i have, Show me how many trees i have, Which are my last notifications, let's see the level of experience of the trees   ")
                break;
            }
        }
        return super.finalResponse
    }
}
