import {Machine} from "../state_machine/Machine"

const machine = new Machine();
/**
 * Api handling the dialogflow exchange:
 * Event is equivalent to HTTP POST request with body a json like this {phrase:"hi,forest!"}
 * I read the phrase and ask the machine to handle: 1) The DialogFlow detect intent
 *                                                  2) The creation of the Json to send back
 *                                                  3) The advancement of the machine state
 */
export default defineEventHandler(async (event) => {
    let answer: string
    const body = await readBody(event)
    let phrase: string = body.phrase;
    // make this method return the json to send back to the client
    answer = await machine.prepareResponse(phrase)
    // console.log(answer)
    return {body}
})
