import { StateOperations } from "./stateOperations";

/**
 * The possible states the machine can have
 * Each state will redefine how they handle all the stateOperations 
 * They will also handle which is the correct next state for the machine
 */
export abstract class MachineState implements StateOperations{
    /**
     * Prepares the appropriate json response by interacting with the dialogflow api
     */
    prepareResponse(): void {
        throw new Error("Method not implemented.");
    }
    /**
     * Changes its state based on the response he sent 
     */
    changeState(): MachineState {
        throw new Error("Method not implemented.");
    }
}

export class IdleState extends MachineState{

}