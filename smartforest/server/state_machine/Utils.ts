import {MachineState} from "~/server/state_machine/MachineState";
import {UserPromptState} from "~/server/state_machine/states/UserPromptState";
import {AdviceSelectionState} from "~/server/state_machine/states/right_wing/AdviceSelectionState";
import {HowToSpendRequestState} from "~/server/state_machine/states/middle_wing/HowToSpendRequestState";
import {StateRequestState} from "~~/server/state_machine/states/middle_wing/StateRequestState";
import {StateRequestBottomState} from "~/server/state_machine/states/middle_wing/StateRequestBottomState";
// import {StateRequestState} from "~/server/state_machine/states/middle_wing/StateRequestState";
import {ActionSelectionState} from "~/server/state_machine/states/left_wing/ActionSelectionState";
import {PositionSelectionState} from "~/server/state_machine/states/left_wing/PositionSelectionState";
import {TipRequestNoLeavesState} from "~/server/state_machine/states/left_wing/TipRequestNoLeavesState";
import {TipRequestNoPlantsState} from "~/server/state_machine/states/left_wing/TipRequestNoPlantsState";
import { GroupingState } from "./states/left_wing/GroupingState";
import { TutorialPositionSelectionState } from "./states/tutorial/TutorialPositionSelectionState";
import { TutorialPlantState } from "./states/tutorial/TutorialPlantState";
import { TutorialGroupState } from "./states/tutorial/TutorialGroupState";
import { TutorialAwait2State } from "./states/tutorial/TutorialAwait2State";
import { TutorialNotificationState } from "./states/tutorial/TutorialNotificationState";
import { TutorialAdviceState } from "./states/tutorial/TutorialAdviceState";

export class Intents {
    public static advices_appliances_consumption: string = "advices_appliances_consumption";
    public static advices_energy_status: string = "advices_energy_status";
    public static advices_general: string = "advices_general";
    public static advices_start_specific_appliance: string = "advices_start_specific_appliance";
    public static forest_management_buy: string = "forest_management_buy";
    public static forest_management_buy_position: string = "forest_management_buy_position";
    public static forest_management_general: string = "forest_management_general";
    public static forest_management_group: string = "forest_management_group";
    public static forest_status_general: string = "forest_status_general";
    // public static forest_status_overall: string = "forest_status_overall";
    public static forest_status_overall_leaves: string = "forest_status_overall_leaves";
    public static forest_status_overall_levelExperience: string = "forest_status_overall_levelExperience";
    public static forest_status_overall_notifications: string = "forest_status_overall_notifications";
    public static forest_status_overall_numberTrees: string = "forest_status_overall_numberTrees";
    public static forest_status_specific: string = "forest_status_specific";
    public static guide_general: string = "guide_general";
    public static guide_group_plant: string = "guide_group_plant";
    public static guide_plant: string = "guide_plant";
    public static guide_strategy: string = "guide_strategy";
    public static guide_tree_types: string = "guide_tree_types";
    public static no_answer: string = "no_answer";
    public static Welcome_Flora: string = "Welcome_Flora";
    public static yes_answer: string = "yes_answer";
    public static exit_intent:string = "Exit"
    public static switchOff_intent:string = "SwitchOff"
    public static tutorial_intent:string = "play_tutorial"
}

export enum NameStates {
    UserPromptState = "UserPromptState",
    UserRequestState = "UserRequestState",
    AdviceSelectionState = "AdviceSelectionState",
    HowToSpendRequestState = "HowToSpendRequestState",
    StateRequestState = "StateRequestState",
    StateRequestBottomState = "StateRequestBottomState",
    // StateRequestState = "StateRequestState",
    ActionSelectionState = "ActionSelectionState",
    PositionSelectionState = "PositionSelectionState",
    TipRequestNoLeavesState = "TipRequestNoLeavesState",
    TipRequestNoPlantsState = "TipRequestNoPlantsState",
    GroupingState = "GroupingState",
    TutorialPositionSelectionState = "TutorialPositionSelectionState",
    TutorialPlantState = "TutorialPlantState",
    TutorialGroupState = "TutorialGroupState",
    TutorialAwait2State = "TutorialAwait2State",
    TutorialNotificationState = "TutorialNotificationState",
    TutorialAdviceState = "TutorialAdviceState"
}

export enum PlantPlaces {
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    RIGHT = "RIGHT",
    LEFT = "LEFT"
}


export const statesMap: Map<string, MachineState> = new Map<string, MachineState>([
    [NameStates.UserPromptState, new UserPromptState()],
    [NameStates.AdviceSelectionState, new AdviceSelectionState()],
    [NameStates.HowToSpendRequestState, new HowToSpendRequestState()],
    [NameStates.StateRequestState, new StateRequestState()],
    [NameStates.StateRequestBottomState, new StateRequestBottomState()],
    // [NameStates.StateRequestState, new StateRequestState()],
    [NameStates.ActionSelectionState, new ActionSelectionState()],
    [NameStates.PositionSelectionState, new PositionSelectionState()],
    [NameStates.TipRequestNoLeavesState, new TipRequestNoLeavesState()],
    [NameStates.TipRequestNoPlantsState, new TipRequestNoPlantsState()],
    [NameStates.GroupingState, new GroupingState()],
    [NameStates.TutorialPositionSelectionState, new TutorialPositionSelectionState()],
    [NameStates.TutorialPlantState, new TutorialPlantState()],
    [NameStates.TutorialGroupState, new TutorialGroupState()],
    [NameStates.TutorialAwait2State, new TutorialAwait2State()],
    [NameStates.TutorialNotificationState, new TutorialNotificationState()],
    [NameStates.TutorialAdviceState, new TutorialAdviceState()],

]);
