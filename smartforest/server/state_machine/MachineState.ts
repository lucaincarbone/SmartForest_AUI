import { DialogHandler } from "../dialogClass";
import { StateOperations } from "./stateOperations";


/**
 * The possible states the machine can have
 * Each state will redefine how they handle all the stateOperations 
 * They will also handle which is the correct next state for the machine
 */
export abstract class MachineState implements StateOperations{
    private dialogHandler: DialogHandler

    constructor() {
        this.dialogHandler = new DialogHandler()
    }

    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    prepareResponse(phrase:string): Promise<string>  {
        return this.dialogHandler.executeQueries([phrase])
    }
    /**
     * Changes its state based on the response he sent 
     */
    changeState(): MachineState {
        return this
    }
}
