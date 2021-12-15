import { Controller } from "./Controller.js"
import { Activities_model } from "../model/Activities_model.js"
import { Activities_view } from "../views/Activities_view.js"
export { Activities_controller }

//Uso de herencia
class Activities_controller extends Controller {

    constructor(user) {
        super()
        this.user = user;
        this.getModel();
    }

    async getModel() {
        let model = new Activities_model(this.user);
        const ACTIVITIES = await model.getActivities();  
        this.getView(ACTIVITIES);
    }

    getView(data) {
        let activitiesPage = new Activities_view(data, this.user);
        activitiesPage.renderView();
    }

}