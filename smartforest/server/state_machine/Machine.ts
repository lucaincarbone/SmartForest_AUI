import {MachineState } from "./MachineState";
import { UserPromptState } from "./states/UserPromptState";


/**
 * Main machine body
 * From the outside calling a function on this class will generate a different response based on the state 
 * From the inside it will delegate the handling to its variable state
 * Ex: machine.handle() => currState.handle() 
 */
export class Machine{
    private _state: MachineState
    constructor() {
        this._state=new UserPromptState()
    }

    /**
     * This function is called every time a voice command is received 
     * It returns a json to send as answer to the client 
     * It also changes its current state 
     */
    public prepareResponse(){
        this._state.prepareResponse()//Ideally response to be sent back = this function returned json
        this._state=this._state.changeState()//change machine state to appropriate next one 
        //return JSON_RESPONSE_FOR_CLIENT
    }

}