import { Login_controller } from "../controller/Login_controller.js"
import { CreateUser_controller } from "../controller/CreateUser_controller.js";
export { Login }

window.app = {};
app.user = "";
app.pass = "";
app.errores = "";

class Login {

    constructor(){
        this.renderLogin()
    }
    
    renderLogin() {
        app.container.innerHTML =
        ` <div class="fadeInDown d-flex justify-content-center align-items-center flex-column">
            <div>
                <div class="display-2 mt-4"></div>
            </div>
            <div id="formContent">
                <form id="formulario">
                    <input type="text" id="login" class="animate__animated animate__flipInX" name="user" placeholder="login"/>
                    <input type="password" id="pass" class="animate__animated animate__flipInX" name="pass" placeholder="password"/>
                </form>
            </div>
            <div class="d-flex justify-content-around align-items-center grupo-botones-login">
                <a class="btn-login animate__animated animate__zoomIn">Login</a>
                <a class="btn-nuevo-usuario" type="button">Nuevo usuario</a>
            </div>
        </div>`;

        let nav = document.querySelector("nav")
        nav.style.display = "none";

        document.querySelector(".btn-login").addEventListener("click", () => {
            var form = app.container.querySelector("#formulario");
            var formData = new FormData(form)
            let user = formData.get("user")
            let password = formData.get("pass")
            new Login_controller(user,password);
        })

        document.querySelector(".btn-nuevo-usuario").addEventListener("click", () => {
            var form = app.container.querySelector("#formulario");
            var formData = new FormData(form)
            let user = formData.get("user")
            let password = formData.get("pass")
            new CreateUser_controller(user,password);
        })
    }  
}
