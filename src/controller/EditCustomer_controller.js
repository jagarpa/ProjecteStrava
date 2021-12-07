import { Controller } from "./Controller.js"
import { EditCustomer_model } from "../model/EditCustomer_model.js"
import { EditCustomer_view } from "../views/EditCustomer_view.js"
export { EditCustomer_controller }

class EditCustomer_controller extends Controller {

    constructor() {
        super()

    }

    async getModel() {

    }

    getView(data) {
        let customersPage = new Customers_view(data);
        customersPage.renderView();
    }

}