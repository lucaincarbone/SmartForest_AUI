import {DialogHandler} from "../dialogClass";
import {StateOperations} from "./stateOperations";


/**
 * The possible states the machine can have
 * Each state will redefine how they handle all the stateOperations
 * They will also handle which is the correct next state for the machine
 */
export abstract class MachineState implements StateOperations {
    private static dialogHandler: DialogHandler = DialogHandler.Instance
    private nextState: MachineState

    constructor() {
        //TODO dialog handler MUST be singleton or else I create a new connection every state change
        this.nextState = this
    }

    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    prepareResponse(phrase: string): Promise<string> {
        return MachineState.dialogHandler.executeQueries([phrase])
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
