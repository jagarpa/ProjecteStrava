import { Controller } from "./Controller.js"
import { NewCustomer_view } from "../views/NewCustomer_view";
import { NewCustomer_model } from "../model/NewCustomer_model.js";

export { NewCustomer_controller }

class NewCustomer_controller extends Controller {

    constructor() {
        super()
        this.data = "";
    }

    async getModel() {
        let customerModel = new NewCustomer_model();
        this.data = await customerModel.getCustomers()
        console.log(this.data)
        this.getView()
    }

    setModel(item) {
        let customerModel = new NewCustomer_model();
        customerModel.setCustomer(item)
    }

    getView() {
        new NewCustomer_view();
    }
}