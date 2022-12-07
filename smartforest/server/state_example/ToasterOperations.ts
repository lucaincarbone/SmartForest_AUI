 /**
     * Interface defining which actions the toaster will be hable to handle in every state 
     * It is used by both toaster and state to define the same functions externally and internally
     */
  export interface ToasterOperations {
    insertBread(): void
    pullLever(): void
    ejectBread(): void
    removeBread(): void
    advanceState(phrase:string): void
}
