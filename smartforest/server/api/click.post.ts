import { Machine } from "../state_machine/Machine"
const machine = Machine.Instance;

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let id: string = body.id;
    let splitted = id.split("-", 6);
    console.log(splitted)
    let response = getStructure();
    try {
        response = machine.groupAction(response, splitted)
    } catch (e) {
        //somehow clicked while not in grouping state
        console.error("Error: group request received while not in group state")
    }
    if (response.success == true) {
        await machine.prepareResponse("!Grouping succesfull!")
    }
    return response
})

function getStructure() {
    return {
        "queryResult": {
            "fulfillmentText": "Insert here fullfillment text",
        },
        "data": {},
        "success": true
    }
}
