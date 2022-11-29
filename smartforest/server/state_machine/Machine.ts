/**
 * Main machine body
 * From the outside calling a function on this class will generate a different response based on the state 
 * From the inside it will delegate the handling to its variable state
 * Ex: machine.handle() => currState.handle() 
 */