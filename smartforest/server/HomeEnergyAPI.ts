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

    // TODO: put this stuff also in the front-end (it works)
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
     * https://it.javascript.info/websocket#esempio-di-chat
     * https://www.npmjs.com/package/express-ws
     */
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
     * The Smart Home Server for now
     * just replies with the same message
     */
    public testTheWebSocket() {
        this._socket.send("IT the Clown");
        // if (connected) {
        //     this._socket.send("Il mio nome è lil");
        // } else {
        //     console.log("WAIT")
        // }
    }

    /**
     * Method that returns a number that represents the overall
     * battery energy accumulated
     */
    public async getOverallBatteryEnergy() {
        const res = await fetch(this._url + this._batteryUrl);
        if (res.ok) {
            const data = await res.json();
            return data.capacity
        } else {
            console.error("Error in fetching: " + this._url + this._batteryUrl)
        }
    }

    /**
     * Void method that sets to zero the energy accumulated by the batteries
     */
    public async resetBatteryStatus() {
        const res = await fetch(this._url + this._resetUrl);
        if (res.ok) {
            return await res.json()
        } else {
            console.error("Error in fetching: " + this._url + this._resetUrl)
        }
    }
}
