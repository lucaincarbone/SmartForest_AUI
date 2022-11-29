import { ToasterOperations } from "./ToasterOperations"

/**
     * Define the default response to actions not redefined by the current state 
     * Ex: toaster.ejectBread() when state is idle and not toasting
     */
 export abstract class ToasterState implements ToasterOperations {
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
    public advanceState(): ToasterState {
        throw new Error("Invalid operation")    
    }
}
/**
     * Idle state 
     */
 export class IdleState extends ToasterState {
    public insertBread(): ToasterState {
        return new BreadInsertedState()
    }
    public advanceState(): ToasterState {
        console.log("Advancing state from idle")
        return new BreadInsertedState()
    }

}

 
    /**
     * State when bread is inserted
     */
     export class BreadInsertedState extends ToasterState {
        public pullLever(): ToasterState {
            return new ToastingState()
        }
        public advanceState(): ToasterState {
            console.log("Advancing state from BreadInserted")
            return new ToastingState()
        }
    }
/**
     * State when bread is being toasted 
     */
 export class ToastingState extends ToasterState {
    public ejectBread(): ToasterState {
        return new BreadEjectedState()
    }
    public advanceState(): ToasterState {
        console.log("Advancing state from Toasting")
        return new BreadEjectedState()
    }
    
}

   /**
     * state when bread has been ejected
     */
    export class BreadEjectedState extends ToasterState {
        public removeBread(): ToasterState {
            return new IdleState()
        }
        public advanceState(): ToasterState {
            console.log("Advancing state from Ejected")
            return new IdleState()
        }
    }


