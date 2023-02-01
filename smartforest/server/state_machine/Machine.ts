import {MachineState} from "./MachineState";
import {Model} from "~/server/Model";
import {NameStates, statesMap} from "~/server/state_machine/Utils";


/**
 * Main machine body
 * From the outside calling a function on this class will generate a different response based on the state
 * From the inside it will delegate the handling to its variable state
 * Ex: machine.handle() => currState.handle()
 */
export class Machine {
    private static _instance: Machine;
    private _state: MachineState

    private constructor() {
        this._state = statesMap.get(NameStates.UserPromptState)!
    }
    
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * This function is called every time a voice command is received
     * It takes as parameter the string command
     * It returns a json to send as answer to the client
     * It also changes its current state
     */
    public async prepareResponse(phrase: string): Promise<string> {
        let response: any;
        Model.Instance;
        response = await this._state.prepareResponse(phrase) //Ideally response to be sent back = this function returned json
        // console.log(response) // for now it is the intent but state should redefine prepareResponse and return the Json
        // N.B the next state is modified inside the state class while preparing the response so there is no need to redefine the method below in each state
        this._state = this._state.changeState() //change machine state to appropriate next one
        return response; //return JSON_RESPONSE_FOR_CLIENT
    }

    public groupAction(response:any,splitted: string[]): any {
        this._state.groupAction(response,splitted)
        return response
    }

    public updateGameStateGrade(totalGrade:number,currentGrade:number):any{
        return this._state.updateGameStateGrade(totalGrade,currentGrade)
    }
}
