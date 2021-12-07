import { ActivityDetails_view } from "../views/ActivityDetails_view.js";
import { Controller } from "./Controller.js"

export { ActivityDetails_controller}

class ActivityDetails_controller extends Controller {

    constructor(activity) {
        super()
        this.activity = activity;
        this.getView();
    }

    getModel() {
    }

    getView() {
        new ActivityDetails_view(this.activity)
    }

}