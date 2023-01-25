import {Intents, NameStates, statesMap} from "../../Utils"
import {MachineState} from "../../MachineState"
import {HomeEnergyAPI} from "~/server/HomeEnergyAPI";


/**
 * Concrete state class that will redefine prepare response and change state methods
 */
export class AdviceSelectionState extends MachineState {
    /**
     * Using the received string prepares the appropriate json response by interacting with the dialogflow api
     */
    async prepareResponse(phrase: string): Promise<any> {
        // Parent class method returns the intent
        await super.prepareResponse(phrase)
        let intent: string = super.intentString

        switch (intent) {
            // Which is the device that is consuming the most ?
            case Intents.advices_appliances_consumption: {
                try {
                    let mostConsuming = await HomeEnergyAPI.Instance.getMostConsumingDevice()
                    super.setAnswer("The " + mostConsuming + " is the device that is consuming the most")
                } catch (e: any) {
                    super.setAnswer(e.message)
                }

                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break;
            }
            // Tell me how much energy I have available inside the battery
            case Intents.advices_energy_status: {
                try {
                    let overallCapacity = await HomeEnergyAPI.Instance.getOverallBatteryEnergy()
                    super.setAnswer("You have a total of " + overallCapacity + " kWh inside the batteries")
                } catch (e: any) {
                    super.setAnswer(e.message)
                }
                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            // Can I start the washing machine ?
            case Intents.advices_start_specific_appliance: {
                try {
                    if (await HomeEnergyAPI.Instance.canITurnOnTheDevice(super.deviceName)) {
                        super.setAnswer("Yes! You have enough energy in your batteries!")
                    } else {
                        super.setAnswer("I'm sorry but it's better to wait, your batteries don't have accumulated enough energy")
                    }
                } catch (e: any) {
                    super.setAnswer(e.message)
                }

                super.setNextState(statesMap.get(NameStates.UserPromptState)!)
                break
            }
            default: {
                super.prepareResponseDefault("I'm waiting for you to ask me one of the following: Which is the device that is consuming the most?, Tell me how much energy I have available inside the battery,  Can I start the washing machine ? ")
                break;
            }
        }
        return super.finalResponse
    }
}
