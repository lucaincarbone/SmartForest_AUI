import { executeQueries, languageCode, projectId, sessionId } from "../dialogflow"
import { ToasterOperations } from "./ToasterOperations"
import{ IdleState,ToasterState }  from"./ToasterState"



export namespace Appliances
{
    /**
     * Toaster class
     * It when a method is called on this class a submethod is called from the class on its state to provide dynamic handling
     */
    export class Toaster implements ToasterOperations {
        private _state: ToasterState

        constructor() {
            this._state = new IdleState()
        }

        public insertBread(): void {
            this._state = this._state.insertBread()
            this.logCurrentState()

        }
        public pullLever(): void {
            this._state = this._state.pullLever()
            this.logCurrentState()
        }
        public ejectBread(): void {
            this._state = this._state.ejectBread()
            this.logCurrentState()
        }
        public removeBread(): void {
            this._state = this._state.removeBread()
            this.logCurrentState()
        }

        public advanceState(): void {
            this._state = this._state.advanceState()
        }

        private logCurrentState(): void {
            //console.log(this._state)
            //executeQueries(projectId, sessionId, ["Hey, Forest!"], languageCode);
        }
    }
}
