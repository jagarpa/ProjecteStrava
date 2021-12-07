import { Controller } from "./Controller.js"
import { Login_model } from "../model/Login_model.js"
import { FrontPage_controller } from "./FrontPage_controller.js";
export { Login_controller }

class Login_controller extends Controller {

    constructor(user, password) {
        super()
        this.user = user;
        this.password = password;
        this.getModel();
    }

    async getModel() {
        let model = new Login_model(this.user, this.password);
        const TOKEN = await model.login();
        if (TOKEN!=undefined) {
            localStorage.setItem("Token", JSON.stringify(TOKEN))
            let token = JSON.parse(localStorage.getItem("Token"));
            console.log(token)
            this.getView()
        } else {
            localStorage.setItem("Token", null)
        }
    }

    getView() {
        new FrontPage_controller();
    }
}