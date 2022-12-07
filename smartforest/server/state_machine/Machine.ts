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
     * It takes as parameter the string command
     * It returns a json to send as answer to the client 
     * It also changes its current state 
     */
    public async prepareResponse(phrase:string): Promise<string> {
        var response: string 
        response = await this._state.prepareResponse(phrase) //Ideally response to be sent back = this function returned json
        console.log(response) // for now it is the intent but state should redefine prepareResponse and return the Json
        this._state=this._state.changeState() //change machine state to appropriate next one 
        return response //return JSON_RESPONSE_FOR_CLIENT
    }

}