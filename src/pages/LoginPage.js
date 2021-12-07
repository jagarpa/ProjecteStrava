import { Login_controller } from "../controller/Login_controller.js"
export { LoginPage }

class LoginPage {

    constructor(){
        this.renderLogin()
    }
    
    renderLogin() {
        app.container.innerHTML =
        ` <div class="wrapper fadeInDown">
            <div id="formContent">
                <form id="formulario">
                    <input type="text" id="login" class="fadeIn second" name="user" placeholder="login"/>
                    <input type="password" id="pass" class="fadeIn third" name="pass" placeholder="password"/>
                    <input type="button" class="fadeIn fourth" value="Log In" id="boton"/>
                </form>
            </div>
        </div>`;

        document.querySelector("#boton").addEventListener("click", () => {
            var form = app.container.querySelector("#formulario");
            var formData = new FormData(form)
            let user = formData.get("user")
            let password = formData.get("pass")
            let controller = new Login_controller(user,password);
        })
    }      
}
