import {Intents, NameStates, statesMap} from "../Utils";
import {MachineState} from "../MachineState";
import { Model } from "~~/server/Model";


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class UserPromptState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        switch (intent) {
            case Intents.Welcome_Flora: {
                console.log(Intents.Welcome_Flora)
                //super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            case Intents.forest_management_general: {
                console.log(Intents.forest_management_general)
                super.setNextState(statesMap.get(NameStates.ActionSelectionState)!)
                break;
            }
            case Intents.forest_management_buy: {
                console.log(Intents.forest_management_buy)
                if(Model.Instance.canIBuyATree()){
                    super.setNextState(statesMap.get(NameStates.PositionSelectionState)!)
                }
                else{
                    super.setAnswer("Ops, you have not enough Leaves to buy a plant! Would you like to know how to get some?")
                    super.setNextState(statesMap.get(NameStates.TipRequestNoLeavesState)!)
                }
                break;
            }
            case Intents.forest_management_group: {
                console.log(Intents.forest_management_group)
                break;
            }
            case Intents.forest_status_general: {
                console.log(Intents.forest_status_general)
                // super.setNextState(statesMap.get(NameStates.StateRequestState)!)
                break;
            }
            case Intents.forest_status_overall: {
                console.log(Intents.forest_status_overall)
                break;
            }
            case Intents.forest_status_overall_leaves: {
                console.log(Intents.forest_status_overall_leaves)
                break;
            }
            case Intents.forest_status_overall_levelExperience: {
                console.log(Intents.forest_status_overall_levelExperience)
                break;
            }
            case Intents.forest_status_overall_notifications: {
                console.log(Intents.forest_status_overall_notifications)
                break;
            }
            case Intents.forest_status_overall_numberTrees: {
                console.log(Intents.forest_status_overall_numberTrees)
                break;
            }
            case Intents.forest_status_specific: {
                console.log(Intents.forest_status_specific)
                break;
            }
            case Intents.guide_general: {
                console.log(Intents.guide_general)
                break;
            }
            case Intents.guide_group_plant: {
                console.log(Intents.guide_group_plant)
                break;
            }
            case Intents.guide_strategy: {
                console.log(Intents.guide_strategy)
                break;
            }
            case Intents.guide_tree_types: {
                console.log(Intents.guide_tree_types)
                break;
            }
            case Intents.guide_plant: {
                console.log(Intents.guide_plant)
                break;
            }
            case Intents.advices_general: {
                console.log(Intents.advices_general)
                // super.setNextState(statesMap.get(NameStates.AdviceSelectionState)!)
                break;
            }
            case Intents.advices_appliances_consumption: {
                console.log(Intents.guide_plant)
                break;
            }
            case Intents.advices_energy_status: {
                console.log(Intents.guide_plant)
                break;
            }
            case Intents.advices_start_specific_appliance: {
                console.log(Intents.guide_plant)
                break;
            }
            case Intents.exit_intent: {
                super.setAnswer("Exiting")
                console.log(Intents.exit_intent)
                break;
            }
            default: {
                console.log("From UserPromptState could not detect intent: " + intent)
                // super.setDefaultAnswer()
                break;
            }
        }

        return super.finalResponse
    }

}
