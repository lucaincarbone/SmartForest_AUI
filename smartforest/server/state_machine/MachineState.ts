import {DialogHandler} from "../DialogClass";
import {StateOperations} from "./StateOperations";
import {NameStates} from "~/server/state_machine/Utils";
import {UserPromptState} from "~/server/state_machine/states/UserPromptState";
import {UserRequestState} from "~/server/state_machine/states/UserRequestState";
import {AdviceSelectionState} from "~/server/state_machine/states/right_wing/AdviceSelectionState";
import {HowToSpendRequestState} from "~/server/state_machine/states/middle_wing/HowToSpendRequestState";
import {SpecificStateRequestState} from "~/server/state_machine/states/middle_wing/SpecificStateRequestState";
import {StateRequestBottomState} from "~/server/state_machine/states/middle_wing/StateRequestBottomState";
import {StateRequestState} from "~/server/state_machine/states/middle_wing/StateRequestState";
import {ActionSelectionState} from "~/server/state_machine/states/left_wing/ActionSelectionState";
import {PositionSelectionState} from "~/server/state_machine/states/left_wing/PositionSelectionState";
import {TipRequestNoLeavesState} from "~/server/state_machine/states/left_wing/TipRequestNoLeavesState";
import {TipRequestNoPlantsState} from "~/server/state_machine/states/left_wing/TipRequestNoPlantsState";


/**
 * The possible states the machine can have
 * Each state will redefine how they handle all the stateOperations
 * They will also handle which is the correct next state for the machine
 */
export abstract class MachineState implements StateOperations {
    private nextState: MachineState

    constructor() {
        this.nextState = this
    }

    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    prepareResponse(phrase: string): Promise<Map<string, string>> {
        return DialogHandler.Instance.executeQueries([phrase])
    }

    /**
     * Return the next state for the machine after the current one
     */
    changeState(): MachineState {
        return this.nextState
    }

    /**
     * Set the next state following this one
     */
    setNextState(nextState: MachineState): void {
        this.nextState = nextState
    }
}
