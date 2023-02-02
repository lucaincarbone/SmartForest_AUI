import WebSocket from "ws";
import {FALSE} from "node-sass";

/**
 * Singleton class that handles the request to the API
 * that should return the House energy information.
 * See README.md for further information.
 */
export class HomeEnergyAPI {
    private static _instance: HomeEnergyAPI;
    private _url: string = "https://smart-home-api-2j4i.onrender.com/"
    private _wsurl: string = "wss://smart-home-api-2j4i.onrender.com/echo"
    private _batteryUrl: string = "batteries"
    private _mostConsumingUrl: string = "appliances/mostConsuming"
    private _infoDevice: string = "appliances/name="
    private _resetUrl: string = "reset_all"
    private _socket: any;

    private constructor() {
        console.log("Creating a new HomeEnergyAPI...");
        //this._socket = new WebSocket(this._wsurl);
        //this.handleWebSocket()
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private handleWebSocket() {

        this._socket.onopen = function (e: any) {
            console.log("[open] Connection established");
        };

        this._socket.onmessage = function (event: any) {
            console.log(`[message] Received from the Smart Home: ${event.data}`);
        };

        this._socket.onclose = function (event: any) {
            if (event.wasClean) {
                console.log(`[close] Connection successfully closed, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. the server's process is terminated
                // generally event.code is 1006
                console.log('[close] Connection death.');
            }
        };

        this._socket.onerror = function (error: any) {
            console.log(`[error] ${error.message}`);
        };
    }

    /**
     * Method that returns a number that represents the overall
     * battery energy accumulated
     *
     * @throws an exception if the API is not available
     */
    public async getOverallBatteryEnergy() {
        const res = await fetch(this._url + this._batteryUrl);

        if (res.ok) {
            const data = await res.json();
            return data.capacity
        } else {
            throw new Error("Your Home API is not available")
        }
    }

    /**
     * Method that returns the device that is actually
     * consuming most
     *
     * @throws an exception if all the devices are turned off
     * @throws an exception if the API is not available
     */
    public async getMostConsumingDevice() {
        const res = await fetch(this._url + this._mostConsumingUrl);

        if (res.ok) {
            const data = await res.json();

            if (data.hasOwnProperty('name')) {
                return data.name
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error("Your Home API is not available")
        }
    }

    /**
     * Method that returns true if the device passed as parameter
     * can be turned On, false otherwise
     *
     * @param nameDevice
     * @throws an exception if there is no devices with that name
     * @throws an exception if the API is not available
     */
    public async canITurnOnTheDevice(nameDevice: string) {

        const res = await fetch(this._url + this._infoDevice + nameDevice);
        let deviceConsumption = 0

        if (res.ok) {
            const data = await res.json();

            if (data.hasOwnProperty('name')) {
                if (data.isOn == true) {
                    throw new Error("Your device is already turned on")
                } else {
                    deviceConsumption = parseInt(data.consume)
                }
            } else {
                throw new Error(data.message)
            }
        } else {
            throw new Error("Your Home API is not available")
        }

        let overallCapacity = parseInt(await this.getOverallBatteryEnergy())

        return !(deviceConsumption > overallCapacity);
    }

    /**
     * Void method that sets to zero the energy accumulated by the batteries
     * @throws an exception if the API is not available
     */
    public async resetBatteryStatus() {
        const res = await fetch(this._url + this._resetUrl);
        if (res.ok) {
            return await res.json()
        } else {
            throw new Error("Your Home API is not available")
        }
    }
}
