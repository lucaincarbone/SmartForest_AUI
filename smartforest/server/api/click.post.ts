import { Model } from "../Model";
import { Position } from "../Position";
import { Machine } from "../state_machine/Machine"

const machine = Machine.Instance;

let model = Model.Instance
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id: string = body.id;
    let splitted = id.split("-", 6);
    console.log(splitted)
    let response = getStructure();
    let pos1 = new Position(+splitted[0], +splitted[1])
    let pos2 = new Position(+splitted[2], +splitted[3])
    let pos3 = new Position(+splitted[4], +splitted[5])
    try {
        model.groupTrees([pos1, pos2, pos3])
        let answer = model.JsonWithChanges
        response.data = answer;
        response.success = true;
        response.queryResult.fulfillmentText = "Congratulations, you succesfully grouped your plants"
        model.ResetJsonWithChanges()
        await machine.prepareResponse("!Grouping succesfull!")
        return response
    } catch (e) {
        let answer = model.JsonWithChanges
        console.log(answer)
        response.data = answer
        response.success = false;
        response.queryResult.fulfillmentText = "I'm  sorry, "+getErrorMessage(e)
        model.ResetJsonWithChanges()
        return response;
    }
})
function getStructure() {
    return {
        "queryResult": {
            "fulfillmentText": "Insert here fullfillment text",
        },
        "data": {},
        "success":true
    }
}
function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }