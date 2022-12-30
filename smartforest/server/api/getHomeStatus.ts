import {HomeEnergyAPI} from "~/server/HomeEnergyAPI";

let homeEnergyAPI = HomeEnergyAPI.Instance

export default defineEventHandler(async () => {
    let answer: string

    answer = await homeEnergyAPI.getOverallBatteryEnergy()

    return answer;
})
