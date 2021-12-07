import { View } from "../views/View.js"
import { NewCustomer_controller} from "../controller/NewCustomer_controller"
export { NewCustomer_view }

class NewCustomer_view extends View {

    constructor() {
        super()
        this.item = "";
        this.renderView()
    }

    renderView() {
        app.container.classList.add("animate__animated", "animate__backOutRight")

        setTimeout(() => {
            app.container.classList.remove("animate__animated", "animate__backOutRight")
            app.container.classList.add("animate__animated", "animate__backInLeft")
            app.container.classList.remove("d-flex", "justify-content-center")
            app.container.innerHTML = "";
            app.container.innerHTML = `
            <div class="text-center mt-4">
                <div class="display-6 titulo-nuevo-cliente">Añadir nuevo cliente</div>
            </div>
            <form id="formulario" class="row">
                <div class="col-6">
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre y Apellidos">
                    <p id="errorNombre" class=""></p>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" id="clientSecret" placeholder="Strava Client Secret">
                    <p id="errorClientSecret" class=""></p>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" id="clientid" placeholder="Strava Client ID">
                    <p id="errorClientId" class=""></p>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" id="refreshtoken" placeholder="Strava Refresh Token">
                    <p id="errorRefreshToken" class=""></p>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" id="road" placeholder="Id Strava Bicicleta de Carretera">
                    <p id="errorRoad" class=""></p>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" id="btt" placeholder="Id Strava Bicicleta de Montaña">
                    <p id="errorBtt" class=""></p>
                </div>
                <p id="exito" class=""></p>
                </form>
            `
            let inputNombre = document.querySelector("#nombre")
            let inputClientSecret = document.querySelector("#clientSecret")
            let inputClientId = document.querySelector("#clientid")
            let inputRefreshToken = document.querySelector("#refreshtoken")
            let inputRoad = document.querySelector("#road")
            let inputBtt = document.querySelector("#btt")

            let errorNombre = document.querySelector("#errorNombre")
            let errorClientSecret = document.querySelector("#errorClientSecret")
            let errorClientId = document.querySelector("#errorClientId")
            let errorRefreshToken = document.querySelector("#errorRefreshToken")
            let errorRoad = document.querySelector("#errorRoad")
            let errorBtt = document.querySelector("#errorBtt")
            
            inputNombre.addEventListener("keyup", ()=> {
                if (isNaN(inputNombre.value)) {
                    inputNombre.style.backgroundColor = "#B6FF9D"
                    errorNombre.innerHTML = ""
                    errorNombre.classList.remove("alert", "alert-danger")
                    errorNombre.innerHTML = "";
                } else {
                    inputNombre.style.backgroundColor = "#FF9D9D" 
                    errorNombre.classList.add("alert", "alert-danger")
                    errorNombre.innerHTML = 'Este campo solo admite letras'
                }
            })

            inputClientSecret.addEventListener("keyup", ()=> {
                if (inputClientSecret.value.length===40) {
                    inputClientSecret.style.backgroundColor = "#B6FF9D"
                    errorClientSecret.innerHTML = ""
                    errorClientSecret.classList.remove("alert", "alert-danger")
                    errorClientSecret.innerHTML = "";
                } else {
                    inputClientSecret.style.backgroundColor = "#FF9D9D" 
                    errorClientSecret.classList.add("alert", "alert-danger")
                    errorClientSecret.innerHTML = 'La longitud del "Client Secret" de Strava son 40 carácteres.<br>Te faltan '+(40-inputClientSecret.value.length)+' por teclear.'
                }
            })

            inputClientId.addEventListener("keyup", ()=> {
                if (inputClientId.value.length===5 && !isNaN(inputClientId.value)) {
                    inputClientId.style.backgroundColor = "#B6FF9D"
                    errorClientId.innerHTML = ""
                    errorClientId.classList.remove("alert", "alert-danger")
                    errorClientId.innerHTML = "";
                } else {
                    inputClientId.style.backgroundColor = "#FF9D9D" 
                    errorClientId.classList.add("alert", "alert-danger")
                    errorClientId.innerHTML = 'La longitud del "Client ID" de Strava debe ser de 5 números'
                }
            })

            inputRefreshToken.addEventListener("keyup", ()=> {
                if (inputRefreshToken.value.length===40) {
                    inputRefreshToken.style.backgroundColor = "#B6FF9D"
                    errorRefreshToken.innerHTML = ""
                    errorRefreshToken.classList.remove("alert", "alert-danger")
                    errorRefreshToken.innerHTML = "";
                } else {
                    inputRefreshToken.style.backgroundColor = "#FF9D9D" 
                    errorRefreshToken.classList.add("alert", "alert-danger")
                    errorRefreshToken.innerHTML = 'La longitud del "Refresh Token" de Strava son 40 carácteres.<br>Te faltan '+(40-inputRefreshToken.value.length)+' por teclear.'
                }
            })

            inputRoad.addEventListener("keyup", ()=> {
                if (inputRoad.value.length===8 || inputRoad.value === "vacio") {
                    inputRoad.style.backgroundColor = "#B6FF9D"
                    errorRoad.innerHTML = ""
                    errorRoad.classList.remove("alert", "alert-danger")
                    errorRoad.innerHTML = "";
                } else {
                    inputRoad.style.backgroundColor = "#FF9D9D" 
                    errorRoad.classList.add("alert", "alert-danger")
                    errorRoad.innerHTML = 'La longitud del ID de la bicicleta de carretera debe ser de 8 carácteres o "vacio"'
                }
            })

            inputBtt.addEventListener("keyup", ()=> {
                if (inputBtt.value.length===8 || inputBtt.value === "vacio") {
                    inputBtt.style.backgroundColor = "#B6FF9D"
                    errorBtt.innerHTML = ""
                    errorBtt.classList.remove("alert", "alert-danger")
                    errorBtt.innerHTML = "";
                } else {
                    inputBtt.style.backgroundColor = "#FF9D9D" 
                    errorBtt.classList.add("alert", "alert-danger")
                    errorBtt.innerHTML = 'La longitud del ID de la bicicleta de montaña debe ser de 8 carácteres o "vacio"'
                }
            })


            //Botones de Confirmar / No añadir
            let divInferior = document.createElement("div")
            divInferior.style.display = "none";
            divInferior.classList.add("d-flex", "justify-content-center", "mt-1", "animate__animated", "animate__zoomIn")
            let si = document.createElement("a")
            si.classList.add("navbar-link")
            si.innerHTML = "Confirmar" 
            let no = document.createElement("a")
            no.classList.add("navbar-link", "last-element")
            no.innerHTML = "No añadir"
            no.href = "#/nuevocliente"
            no.addEventListener("click", () => {
                let inputs = Array.from(document.querySelectorAll(".form-control"))
                inputs.map((input) => {
                    input.value = "";
                    input.style.backgroundColor = "White"
                })
                let errors = Array.from(document.querySelectorAll("p"))
                errors.map((error)=> {
                    error.classList.remove("alert", "alert-danger")
                    error.innerHTML = "";
                })

            })
            divInferior.append(si)
            divInferior.append(no)

            app.container.append(divInferior)

            document.querySelector("#formulario").addEventListener("keyup", ()=>{
                let correcto = true;
                let errores = document.querySelectorAll("p")
                errores.forEach(element => {

                    if (element.className!="") {
                        correcto = false;
                    }
                });

                //Comprobar que el formulario NO está vacío
                let inputsArray = Array.from(document.querySelectorAll("input"))
                let valores = inputsArray.map( (elemento) => {return elemento.value.length}).filter(elemento => elemento==0)

                if (correcto==true && valores.length===0) {
                    console.log("Click SI")
                    si.addEventListener("click", function () {
                        console.log("Confirmar")
                        console.log(inputClientId.value)
                        let item = {"client_id":inputClientId.value,"client_secret":inputClientSecret.value,"equipment":{"btt":inputBtt.value,"road":inputRoad.value},"name":inputNombre.value,"refresh_token":inputRefreshToken.value}
                        let controller = new NewCustomer_controller()
                        controller.setModel(item)
                    })
                }
            })

            
        }, 1000);
    }
  
}
