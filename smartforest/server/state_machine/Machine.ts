import { IdleState, MachineState } from "./MachineState";

/**
 * Main machine body
 * From the outside calling a function on this class will generate a different response based on the state 
 * From the inside it will delegate the handling to its variable state
 * Ex: machine.handle() => currState.handle() 
 */
export class Machine{
    private _state: MachineState
    constructor() {
        this._state=new IdleState()
        //this._state = new StartingState()
    }

    /**
     * This function is called every time a voice command is received 
     * It returns a json to send as answer to the client 
     * It also changes its current state 
     */
    public prepareResponse(){
        this._state.prepareResponse()
        this._state=this._state.changeState()
    }

}