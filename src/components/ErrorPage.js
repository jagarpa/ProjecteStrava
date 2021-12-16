import { router } from "../router/router";

export { ErrorPage }

//MVC
class ErrorPage {

    constructor(error, message){
        this.error = error;
        this.message = message;
        this.renderView()
    }
    
    renderView() {
        window.document.title = "Error"
        app.container.innerHTML = "";
        app.container.innerHTML =
        //Template literal
        ` <div class="fadeInDown d-flex justify-content-center align-items-center flex-column">
            <div>
                <div class="titulo-pagina-error display-4 mt-4">¡Houston, Houston! Tenemos un problema ...</div>
            </div>
            <div id="d-flex justify-content-center mt-4">
                <div class="alert alert-danger mt-4" role="alert">
                     ${this.error} - ${this.message}
                </div>
            </div>
            <div class="d-flex justify-content-around align-items-center grupo-botones-login">
                <a href="#/login" class="btn-login animate__animated animate__zoomIn">Volver</a>
            </div>
        </div>`;
    }  
}
