/**
 * Singleton class that handles the request to the API
 * that should return the House energy information.
 * See README.md for further information.
 */
export class HomeEnergyAPI {
    private static _instance: HomeEnergyAPI;
    private _url: string = "https://smart-home-api-2j4i.onrender.com/"
    private _batteryUrl: string = "batteries"
    private _resetUrl: string = "reset_all"

    private constructor() {
        console.log("Creating a new HomeEnergyAPI...")
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * Method that returns a number that represents the overall
     * battery energy accumulated
     */
    public async getOverallBatteryEnergy() {
        const res = await fetch(this._url + this._batteryUrl);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
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
            const data = await res.json();
            console.log(data);
        } else {
            console.error("Error in fetching: " + this._url + this._resetUrl)
        }
    }
}
