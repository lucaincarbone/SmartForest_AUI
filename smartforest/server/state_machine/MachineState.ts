import {DialogHandler} from "../DialogClass";
import {StateOperations} from "./StateOperations";
import {Model} from "../Model";
import { Intents, NameStates, statesMap } from "./Utils";


/**
 * The possible states the machine can have
 * Each state will redefine how they handle all the stateOperations
 * They will also handle which is the correct next state for the machine
 */
export abstract class MachineState implements StateOperations {
    private nextState: MachineState
    private _jsonAnswerFromCA!: any

    constructor() {
        this.nextState = this
    }

    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        this._jsonAnswerFromCA = await DialogHandler.Instance.executeQueries([phrase])
        return this._jsonAnswerFromCA
    }

    /**
     * Return the next state for the machine after the current one
     */
    changeState(): MachineState {
        let nextState:MachineState=this.nextState
        this.nextState=this
        return nextState
    }

    /**
     * Set the next state following this one
     */
    setNextState(nextState: MachineState): void {
        Model.Instance.ResetJsonWithChanges()
        //console.log("setting State to "+nextState)
        this.nextState = nextState
    }

    get answerString() {
        return this._jsonAnswerFromCA.queryResult.fulfillmentText.toString()
    }

    get intentString() {
        return this._jsonAnswerFromCA.queryResult.intent.displayName.toString()
    }

    get parametersJson() {
        return this._jsonAnswerFromCA.queryResult.parameters
    }

    get tree_position(): string {
        return this._jsonAnswerFromCA.queryResult.parameters.fields.tree_position.stringValue.toUpperCase()
    }

    setChanges(changes: any) {
        this._jsonAnswerFromCA.changes = changes
    }

    setAnswer(answer: string) {
        this._jsonAnswerFromCA.queryResult.fulfillmentText = answer
    }

    setDefaultAnswer() {
        this._jsonAnswerFromCA.queryResult.fulfillmentText = "You can not ask me this right now"
    }

    get finalResponse() {
        return this._jsonAnswerFromCA
    }

    /**
     * Handle exit e non recognized intent
     * @param name Name of the Child State
     */
    prepareResponseDefault(name:string){
        let intent = this.intentString
        switch(intent){
            case Intents.exit_intent:{
                this.setAnswer("Exiting")
                this.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            default:{
                console.log("From "+name+" could not detect intent:" + intent)
                this.setDefaultAnswer()
            }
        }
    }
}
