import { Model } from "./Model.js"
export { Customers_model }

class Customers_model extends Model {

    constructor() {
        super()
        this.token = JSON.parse(localStorage.getItem("Token"));
    }

    async getCustomers() {
        try {
            const idToken = this.token._tokenResponse.idToken
            const RESPONSE = await fetch("https://frontendapp-a41ad-default-rtdb.firebaseio.com/users.json?auth="+idToken);
            //const RESPONSE = await fetch("https://frontendapp-a41ad-default-rtdb.firebaseio.com/users.json")
            const CUSTOMERS = await RESPONSE.json();
            const DATA = Object.entries(CUSTOMERS)
            return  DATA;
        } catch (error) {
            console.log(error)
        }
    }
}