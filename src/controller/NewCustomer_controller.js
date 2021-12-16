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
        this.getView()
    }

    async setModel(item) {
        let customerModel = new NewCustomer_model();
        const data = await customerModel.setCustomer(item)
        return data;
    }

    async updateModel(item) {
        let customerModel = new NewCustomer_model();
        const data = await customerModel.updateCustomer(item)
    }

    getView() {
        new NewCustomer_view();
    }
}