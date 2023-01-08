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
            //hey, Forest
            case Intents.Welcome_Flora: {
                console.log(Intents.Welcome_Flora)
                break;
            }
            //I want to modify my forest
            case Intents.forest_management_general: {
                console.log(Intents.forest_management_general)
                super.setNextState(statesMap.get(NameStates.ActionSelectionState)!)
                break;
            }
            //I want to buy a new plant
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
            //I want to group some plants
            case Intents.forest_management_group: {
                console.log(Intents.forest_management_group)
                if(Model.Instance.canIGroupTrees()){
                    super.setChanges(Model.Instance.JsonWithChanges)
                    super.setNextStateNoReset(statesMap.get(NameStates.GroupingState)!)
                }
                else{
                    super.setAnswer(`You can't group any plant!
                    To group plants you need to have at least 3 trees with max. experience, at a level 1 or 2.
                    Would you like to know how to gain experience?`)
                    super.setNextState(statesMap.get(NameStates.TipRequestNoPlantsState)!)
                }
                break;
            }
            //I want to know the status of my forest
            case Intents.forest_status_general: {
                console.log(Intents.forest_status_general)
                super.setNextState(statesMap.get(NameStates.StateRequestState)!)
                break;
            }

            // case Intents.forest_status_overall: {
            //     console.log(Intents.forest_status_overall)
            //     break;
            // }

            //How many leaves do i have?
            case Intents.forest_status_overall_leaves: {
                let x = Model.Instance.getNoOfLeaves()
                super.setAnswer("You have "+x+" leaves in your forest")
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
            //Which are my last notifications?
            case Intents.forest_status_overall_notifications: {
                console.log(Intents.forest_status_overall_notifications)
                break;
            }
            //let's see the level of experience of the trees
            case Intents.forest_status_overall_levelExperience: {
                let x = Model.Instance.getLevelexperience()
                super.setAnswer(`You global level experience is ${x}.
                Do you want to know your level progress over time?`)
                super.setNextState(statesMap.get(NameStates.StateRequestBottomState)!)
                break
            }
            //single tree
            case Intents.forest_status_specific: {
                console.log(Intents.forest_status_specific)
                break;
            }

            //show me how to play
            case Intents.guide_general: {
                console.log(Intents.guide_general)
                break;
            }
            //Can i group trees?
            case Intents.guide_group_plant: {
                console.log(Intents.guide_group_plant)
                break;
            }
            //What is the best strategy?
            case Intents.guide_strategy: {
                console.log(Intents.guide_strategy)
                break;
            }
            //What are the tree types?
            case Intents.guide_tree_types: {
                console.log(Intents.guide_tree_types)
                break;
            }
            //How do i plant a tree?
            case Intents.guide_plant: {
                console.log(Intents.guide_plant)
                break;
            }
            //Show me the status of my house
            case Intents.advices_general: {
                console.log(Intents.advices_general)
                super.setNextState(statesMap.get(NameStates.AdviceSelectionState)!)
                break;
            }
            //What appliance is consuming the most
            case Intents.advices_appliances_consumption: {
                console.log(Intents.advices_general) //TODO
                break;
            }
            //Tell me how much energy I have available inside the battery
            case Intents.advices_energy_status: {
                console.log(Intents.advices_general)
                break
            }
            //Can I start the washing machine ?
            case Intents.advices_start_specific_appliance: {
                console.log(Intents.advices_general)
                break
            }
            //Exit and not recognized
            default: {
                super.prepareResponseDefault("UserPrompState")
                break;
            }
        }

        return super.finalResponse
    }

}
