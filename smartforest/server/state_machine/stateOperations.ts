import { MachineState } from "./MachineState"

 /**
     * Interface defining which functions the machine states will be hable to handle
     * each state will define how they handle each function in a different way
     */
  export interface StateOperations {
    prepareResponse(phrase:string): Promise<string> 
    changeState(): MachineState
}