import { Login_controller } from "../controller/Login_controller.js"
import { fromEvent } from "rxjs";
import { router } from "../router/router.js";
export { Login }

window.app = {};
app.user = "";
app.pass = "";
app.errores = "";

//MVC
class Login {

    constructor(){
        this.renderLogin()
    }
    
    renderLogin() {
        window.document.title = "Login"
        app.container.classList.add("animate__animated", "animate__backOutRight")
        app.mocha.classList.add("animate__animated", "animate__backOutRight")

        setTimeout(() => {
            app.container.classList.remove("animate__animated", "animate__backOutRight")
            app.container.classList.add("animate__animated", "animate__backInLeft")
            app.container.innerHTML = "";

        app.container.innerHTML =
        //Template literal
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
            <div class="d-flex justify-content-around align-items-center grupo-botones-login">
            <a id="botonTest" href="#/test" class="btn btn-outline-secondary animate__animated animate__zoomIn">Visualizar Tests</a>
            </div> 
        </div>`;

        //Ocultamos el menú principal para no visualizarlo hasta que el usuario no haga login
        let menuSuperior = document.querySelector("nav")
        menuSuperior.style.display = "none";

        //Ocultamos el test
        app.mocha.style.display = "none";

        //QuerySelector
        document.querySelector(".btn-login").addEventListener("click", () => {
            var form = app.container.querySelector("#formulario");
            //formData
            var formData = new FormData(form)
            let user = formData.get("user")
            let password = formData.get("pass")
            new Login_controller(user,password);
        })

        //Boton de test
        const botonTest = document.querySelector("#botonTest")
        //Boton de test

/*         const observableTest = fromEvent(botonTest, "click")
        observableTest.subscribe(()=> router('#/test')) 
 */
        /* ----------- ACTIVAR PARA PODER INTRODUCIR UN NUEVO USUARIO EN FIREBASE ------------- */
            document.querySelector(".btn-nuevo-usuario").style.display = "none";
        /* document.querySelector(".btn-nuevo-usuario").addEventListener("click", () => {
            var form = app.container.querySelector("#formulario");
            var formData = new FormData(form)
            let user = formData.get("user")
            let password = formData.get("pass")
            new CreateUser_controller(user,password);
        }) */
    }, 1000);
    }  
}
