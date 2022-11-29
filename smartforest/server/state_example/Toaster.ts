export namespace Appliances
{
    /**
     * Toaster class
     */
    export class Toaster implements ToasterOperations {
        private _state: ToasterState = new IdleState()

        constructor() {
            this.logCurrentState()
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

        private logCurrentState(): void {
            console.log(this._state)
        }
    }
    /**
     * Interface defining which actions the toaster will be hable to handle in every state 
     */
    export interface ToasterOperations {
        insertBread(): void
        pullLever(): void
        ejectBread(): void
        removeBread(): void
    }

    /**
     * Define the default response to actions not redefined by the current state 
     * Ex: toaster.ejectBread() when state is idle and not toasting
     */
    abstract class ToasterState implements ToasterOperations {
        public insertBread(): ToasterState {
            throw new Error("Invalid operation")
        }
        public pullLever(): ToasterState {
            throw new Error("Invalid operation")
        }
        public ejectBread(): ToasterState {
            throw new Error("Invalid operation")
        }
        public removeBread(): ToasterState {
            throw new Error("Invalid operation")
        }
    }
    /**
     * Idle state 
     */
    class IdleState extends ToasterState {
        public insertBread(): ToasterState {
            return new BreadInsertedState()
        }
    }
    /**
     * State when bread is inserted
     */
    class BreadInsertedState extends ToasterState {
        public pullLever(): ToasterState {
            return new ToastingState()
        }
    }
    /**
     * State when bread is being toasted 
     */
    class ToastingState extends ToasterState {
        public ejectBread(): ToasterState {
            return new BreadEjectedState()
        }
    }
    /**
     * state when bread has been ejected
     */
    class BreadEjectedState extends ToasterState {
        public removeBread(): ToasterState {
            return new IdleState()
        }
    }
}
