import { Controller } from "./Controller.js"
import { Login_model } from "../model/Login_model.js"
import { FrontPage_view } from "../views/FrontPage_view.js";
export { FrontPage_controller }

class FrontPage_controller extends Controller {

    constructor() {
        super()
        this.getView();
    }

    getModel() {
    }

    getView() {
        new FrontPage_view();
    }

}