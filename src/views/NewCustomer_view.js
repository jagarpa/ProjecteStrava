import { View } from "../views/View.js"
import { NewCustomer_controller } from "../controller/NewCustomer_controller"
import { router } from "../router/router.js";
import { Animations_control } from "../helpers/Animations_control.js";
import { fromEvent } from "rxjs";
import { ErrorPage } from "../components/ErrorPage.js";
export { NewCustomer_view }

class NewCustomer_view extends View {

    constructor() {
        super()
        this.item = "";
        this.animacion = new Animations_control();
        this.renderView()
    }

    renderView() {
        window.document.title = "Añadir nuevo cliente"
        this.animacion.agregarAnimacionSalida();
        setTimeout(() => {
            this.animacion.eliminarAnimacionSalida();
            this.animacion.agregarAnimacionEntrada();
            app.container.classList.remove("d-flex", "justify-content-center")
            app.container.classList.add("container")
            app.container.innerHTML = "";
            app.container.innerHTML = this.templateFormulario();

            const nombre = document.querySelector("#nombre")
            const secret = document.querySelector("#clientSecret")
            const id = document.querySelector("#clientid")
            const refresh = document.querySelector("#refreshtoken")
            const road = document.querySelector("#road")
            const btt = document.querySelector("#btt")

            const errorNombre = document.querySelector("#errorNombre")
            const errorSecret = document.querySelector("#errorSecret")
            const errorId = document.querySelector("#errorId")
            const errorRefresh = document.querySelector("#errorRefresh")
            const errorRoad = document.querySelector("#errorRoad")
            const errorBtt = document.querySelector("#errorBtt")

            const observableNombre = fromEvent(nombre, "keyup")
            const observableSecret = fromEvent(secret, "keyup")
            const observableId = fromEvent(id, "keyup")
            const observableRefresh = fromEvent(refresh, "keyup")
            const observableRoad = fromEvent(road, "keyup")
            const observableBtt = fromEvent(btt, "keyup")

            observableNombre.subscribe(() => {
                if (isNaN(nombre.value)) {
                    this.validarCampo(nombre, errorNombre, true)
                } else {
                    this.validarCampo(nombre, errorNombre, false)
                    this.mensajeError(nombre, errorNombre, "nombre")
                }
            })

            observableSecret.subscribe(() => {
                if (secret.value.length === 40) {
                    this.validarCampo(secret, errorSecret, true)
                } else {
                    this.validarCampo(secret, errorSecret, false)
                    this.mensajeError(secret, errorSecret, "clientsecret")
                }
            })

            observableId.subscribe(() => {
                if (id.value.length === 5 && !isNaN(id.value)) {
                    this.validarCampo(id, errorId, true)
                } else {
                    this.validarCampo(id, errorId, false)
                    this.mensajeError(id, errorId, "clientid")
                }
            })

            observableRefresh.subscribe(() => {
                if (refresh.value.length === 40) {
                    this.validarCampo(refresh, errorRefresh, true)
                } else {
                    this.validarCampo(refresh, errorRefresh, false)
                    this.mensajeError(refresh, errorRefresh, "refresh")
                }
            })

            observableRoad.subscribe(() => {
                if (road.value.length === 8 || road.value === "vacio") {
                    this.validarCampo(road, errorRoad, true)
                } else {
                    this.validarCampo(road, errorRoad, false)
                    this.mensajeError(road, errorRoad, "road")
                }
            })

            observableBtt.subscribe(() => {
                if (btt.value.length === 8 || btt.value === "vacio") {
                    this.validarCampo(btt, errorBtt, true)
                } else {
                    this.validarCampo(btt, errorBtt, false)
                    this.mensajeError(btt, errorBtt, "btt")
                }
            })

            //Botones de Confirmar / No añadir
            const botonesInferior = this.crearDivInferior();

            const botonSi = this.crearBotonSi(botonesInferior);
            const observableSi = fromEvent(botonSi, "click")
            observableSi.subscribe(() => {
                const item = { "client_id": id.value, "client_secret": secret.value, "equipment": { "btt": btt.value, "road": road.value }, "name": nombre.value, "refresh_token": refresh.value }
                const controller = new NewCustomer_controller()
                try {
                    //Agregamos a la base de datos
                    const confirmacion = controller.setModel(item);
                    //Retrasamos la redirección a Clientes para que a firebase le de tiempo a insertar el nuevo usuario
                    //en la base de datos y que al redirigir, nos lo muestre ya en la lista de clientes
                    setTimeout(() => {
                        router("#/customers")
                        window.location.hash = "#/customers"
                    }, 500);
                } catch (error) {
                    new ErrorPage(error, "No se ha podido insertar el usuario en la base de datos")
                }
            })

            const botonNo = this.crearBotonNo(botonesInferior);
            const observableNo = fromEvent(botonNo, "click")
            observableNo.subscribe(()=> {
                //Uso de querySelectorAll
                let inputs = Array.from(document.querySelectorAll(".form-control"))
                inputs.map((input) => {
                    input.value = "";
                    input.style.backgroundColor = "White"
                })
                let errors = Array.from(document.querySelectorAll("p"))
                errors.map((error) => {
                    error.classList.remove("alert", "alert-danger")
                    error.innerHTML = "";
                })
            })

            app.container.append(botonesInferior)

            const formulario = document.querySelector("#formulario")
            const observableForm = fromEvent(formulario, "keyup")
            observableForm.subscribe(() => this.comprobarFormularioVacio(botonSi))

        }, 1000);

    }

    templateFormulario() {
        //Uso de Template Literal
        return `
        <div class="text-center mt-4">
            <div class="display-6 titulo-nuevo-cliente">Añadir nuevo cliente</div>
        </div>
        <form id="formulario" class="row mt-2">
            <div class="col-6">
                <input type="text" class="form-control" id="nombre" placeholder="Nombre y Apellidos">
                <p id="errorNombre" class=""></p>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" id="clientSecret" placeholder="Strava Client Secret">
                <p id="errorSecret" class=""></p>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" id="clientid" placeholder="Strava Client ID">
                <p id="errorId" class=""></p>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" id="refreshtoken" placeholder="Strava Refresh Token">
                <p id="errorRefresh" class=""></p>
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
    }

    validarCampo(input, error, valido) {
        if (valido) {
            input.style.backgroundColor = "#B6FF9D"
            error.innerHTML = "";
            error.classList.remove("alert", "alert-danger")
        } else {
            input.style.backgroundColor = "#FF9D9D"
            error.classList.add("alert", "alert-danger")
        }
    }

    mensajeError(input, error, tipo) {
        let mensajes = {
            "nombre": "Este campo solo admite letras",
            "clientsecret": 'La longitud del "Client Secret" de Strava son 40 carácteres.<br>Te faltan ' + (40 - input.value.length) + ' por introducir.',
            "clientid": 'La longitud del "Client ID" de Strava debe ser de 5 números',
            "refresh": 'La longitud del "Refresh Token" de Strava son 40 carácteres.<br>Te faltan ' + (40 - input.value.length) + ' por introducir.',
            "road": 'La longitud del ID de la bicicleta de carretera debe ser de 8 carácteres o "vacio"',
            "btt": 'La longitud del ID de la bicicleta de montaña debe ser de 8 carácteres o "vacio"'
        }
        error.innerHTML = mensajes[tipo]
    }

    crearDivInferior() {
        let divInferior = document.createElement("div")
        divInferior.style.display = "none";
        divInferior.classList.add("d-flex", "justify-content-center", "mt-1", "animate__animated", "animate__zoomIn")
        return divInferior;
    }

    crearBotonSi(divInferior) {
        let si = document.createElement("a")
        si.classList.add("navbar-link")
        si.innerHTML = "Confirmar"
        si.style.display = "none";
        divInferior.append(si)
        return si;
    }

    crearBotonNo(divInferior) {
        let no = document.createElement("a")
        no.classList.add("navbar-link", "last-element")
        no.innerHTML = "No añadir"
        no.href = "#/nuevocliente"
        no.addEventListener("click", () => {


        })

        divInferior.append(no)
        return no;
    }

    comprobarFormularioVacio(botonSi) {
        console.log("ENTRA EN COMPROBAR")
        //Controlamos mediante el evento keyup que todos los campos sean correctos
        let filtroRepeticion = false;
        let correcto = true;
        let errores = document.querySelectorAll("p")
        errores.forEach(element => {
            if (element.className != "") {
                correcto = false;
                filtroRepeticion = false;
                botonSi.style.display = "none"
            }
        });

        //Comprobar que el todo formulario NO está vacío
        const inputsArray = Array.from(document.querySelectorAll("input"))
        let valores = inputsArray.map((elemento) => { return elemento.value.length }).filter(elemento => elemento == 0)

        if (correcto == true && valores.length === 0 && filtroRepeticion == false) {
            filtroRepeticion = true;
            botonSi.style.display = "block";
        }
    }
}
