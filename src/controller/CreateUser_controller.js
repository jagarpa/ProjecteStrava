import { Controller } from "./Controller.js"
import { CreateUser_model } from "../model/CreateUser_model.js"
import { CreateUser_view } from "../views/CreateUser_view.js"

export { CreateUser_controller }

class CreateUser_controller extends Controller {

    constructor(email, password ) {
        super()

        this.email = email;
        this.password = password;
        this.getModel(email, password);
    }

    getModel() {
        let prueba = new CreateUser_model(this.email, this.password);
    }

    getView() {
    }

}