import { Controller } from "./Controller.js"
import { Customers_model } from "../model/Customers_model.js"
import { Customers_view } from "../views/Customers_view.js"
export { Customers_controller }

class Customers_controller extends Controller {

    constructor() {
        super()
        this.getModel();
    }

    async getModel() {
        
        let model = new Customers_model();
        const observable = await model.getCustomers();
        observable.subscribe((data)=> {
            this.getView(data)
        })
    }

    getView(data) {
        let customersPage = new Customers_view(data);
        customersPage.renderView();
    }

}