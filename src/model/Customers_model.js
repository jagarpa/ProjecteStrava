import { ErrorPage } from "../components/ErrorPage.js";
import { Model } from "./Model.js"
import { Observable } from "rxjs";
export { Customers_model }

class Customers_model extends Model {

    constructor() {
        super()
        this.url = app.config.databaseURL
        this.token = JSON.parse(localStorage.getItem("Token"));
    }

    //Programació reactiva
    async getCustomers() {
        const idToken = this.token._tokenResponse.idToken
        const fetchStream = new Observable(async (observer) => {
            try {
             const response = await fetch(`${this.url}/users.json?auth=${idToken}`);
             const data = await response.json();
             observer.next(data);
             observer.complete();
            } catch (err) {
             observer.error(err);
            }
           });

           return fetchStream;
    }

/*     async getCustomers() {
        //Realización de fetch
        try {
            const idToken = this.token._tokenResponse.idToken
            const response = await fetch(`${this.url}/users.json?auth=${idToken}`);
            const customers = await response.json();
            const data = Object.entries(customers)
            return  data; 
        } catch (error) {
            new ErrorPage("Error al consultar los clientes", error)
        }
    } */
}