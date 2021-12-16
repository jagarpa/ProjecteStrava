import { Controller } from "./Controller.js"
import { CustomerData_view } from "../views/CustomerData_view.js"
import { Activities_model } from "../model/Activities_model.js"

export { CustomerData_controller }

//Herència
//MVC
//Classes
//Fetch

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
        new CustomerData_view(this.customer, activities)
    }

}