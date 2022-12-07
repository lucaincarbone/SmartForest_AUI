import { Appliances } from "../state_example/Toaster";
import Toaster = Appliances.Toaster;
var toaster = new Toaster()

export default defineEventHandler(async (event) =>{
    const body = await readBody(event)
    console.log(body.phrase)
    toaster.advanceState(body.phrase)
    return { body }
})