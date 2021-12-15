import { Model } from "./Model.js"

export { NewCustomer_model }

class NewCustomer_model extends Model {

    constructor() {
        super()
        this.url = app.config.databaseURL
        this.token = JSON.parse(localStorage.getItem("Token"));
    }

    async getCustomers() {
        const URL = this.url+"/users.json"
        const RESPONSE = await fetch(URL)
        const DATA = await RESPONSE.json();
        return DATA;
    }

    async setCustomer(item) {
        
        const idToken = this.token._tokenResponse.idToken
        const response = await fetch(`${this.url}/users.json?auth=${idToken}`, {
            method: "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(item),
           })
        const data = await response.json();
        return data;
    }
}