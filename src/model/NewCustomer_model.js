import { ErrorPage } from "../components/ErrorPage.js"
import { Model } from "./Model.js"

export { NewCustomer_model }

class NewCustomer_model extends Model {

    constructor() {
        super()
        this.url = app.config.databaseURL
    }

    async getCustomers() {
        const URL = this.url+"/users.json"
        const RESPONSE = await fetch(URL)
        const DATA = await RESPONSE.json();
        return DATA;
    }

    setCustomer(item) {

        console.log("Entra en setCustomer")
        console.log(item)
/*         try {
            const set = await fetch(this.url + "/users.json", {
                method: "post",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(item),
               })
        } catch (error) {
            new ErrorPage(error, "")
        } */
        
        fetch(this.url + "/users.json", {
            method: "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(item),
           })
            .then((response) => response.json())
            .then((datos) => {
             console.log(datos)
            });
           
    }
}