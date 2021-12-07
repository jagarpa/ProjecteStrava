import { Controller } from "./Controller.js"
import { CreateUser_model } from "../model/CreateUser_model.js"
import { CustomerData_view } from "../views/CustomerData_view.js"
import { Activities_model } from "../model/Activities_model.js"

export { CustomerData_controller }

class CustomerData_controller extends Controller {

    constructor() {
        super()
        this.customer = JSON.parse(localStorage.getItem("User"));;
        this.getModel()
    }

    async getModel() {
        let model = new Activities_model();
        const activities = await model.getActivities(); 
        this.getView(activities) 
    }

    getView(activities) {
        console.log(activities)
        new CustomerData_view(this.customer, activities)
    }

}