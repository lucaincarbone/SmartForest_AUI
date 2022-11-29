 /**
     * Interface defining which actions the machine will be hable to handle in every state 
     * It is used by both machine and state to define the same functions externally and internally
     */
  export interface ToasterOperations {
    insertBread(): void
    pullLever(): void
    ejectBread(): void
    removeBread(): void
    advanceState(): void
}