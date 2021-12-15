import { View } from "./View.js"
import { convertDate } from "../functions.js";
import { secondsToString } from "../functions.js";
import btt from "../images/btt.png";
import road from "../images/road.png";
import running from "../images/running.png"
import question from "../images/question.png"
import { fromEvent } from 'rxjs'
import { Animations_control } from "../helpers/Animations_control.js";

export { Activities_view }

class Activities_view extends View {

    constructor(datosActividades) {
        super()
        this.cliente = JSON.parse(localStorage.getItem("User"));
        this.datosActividades = datosActividades;
        this.animacion = new Animations_control();
    }

    renderView() {
        window.document.title = "Panel de actividades";
        this.animacion.agregarAnimacionSalidaSpinner();
        this.animacion.eliminarAnimacionSalidaSpinner();
        //Doble setTimeOut para controlar que no se solapen las animaciones del Spinner con las del Container
        setTimeout(() => {
            this.animacion.agregarAnimacionSalida();
            setTimeout(() => {
                this.animacion.eliminarAnimacionSalida();
                this.animacion.agregarAnimacionEntrada();

                //Modificamos las clases del container
                app.container.innerHTML = "";
                app.container.classList.remove("d-flex", "justify-content-center")
                app.container.classList.remove("container")

                const contenedorActividades = this.crearContenedorPrincipal()
                const botonesPaginacion = this.crearBotonesPaginación(contenedorActividades);
                const primeraPaginaActividades = this.pagina(contenedorActividades, 0)

                app.container.append(contenedorActividades)
            }, 100);
        }, 1000);
    }

    //Creación de páginas
    pagina(contenedorActividades, index) {
        const limites = this.obtenerLimite(index);
        contenedorActividades.innerHTML = "";
        for (let index = limites[0]; index < limites[1]; index++) {
            if (index < this.datosActividades.length) {
                const card = this.crearCard(contenedorActividades)
                const imagen = this.crearImagen(card, index);
                const cardBody = this.crearCardBody(card)
                const cardTitle = this.crearCardTitle(cardBody, index)
                const cardContent = this.crearCardContent(card, cardBody, index)
            }
        }
    }

    //Creación contenido página principal

    crearContenedorPrincipal() {
        let contenedorActividades = document.createElement("div")
        contenedorActividades.classList.add("d-flex", "flex-wrap", "align-content-start", "justify-content-center", "mt-4", "animate__animated", "animate__fadeInLeft")
        let tituloDiv = document.createElement("div")
        tituloDiv.classList.add("text-center")
        let titulo = document.createElement("h1")
        titulo.classList.add("display-6", "mt-4", "activities-title")
        titulo.innerHTML = "Panel de actividades de " + this.cliente.name;
        tituloDiv.append(titulo)
        app.container.append(tituloDiv);
        return contenedorActividades;
    }

    crearBotonesPaginación(contenedorActividades) {
        let nav = document.createElement("nav")
        nav.classList.add("animate__animated", "animate__fadeInRight", "paginacion")
        nav.id = "nav-pagination-activities"

        let ul = document.createElement("ul")
        ul.classList.add("pagination", "pagination-lg", "justify-content-center")
        nav.append(ul);

        //Objectes predefinits (Object, Math, string...)
        let numberOfButtons = Math.ceil(this.datosActividades.length / 12)

        for (let index = 0; index < numberOfButtons; index++) {

            let paginationButton = document.createElement("button")
            paginationButton.classList.add("btn", "btn-dark", "pagination-button")
            
            const obsPaginationButton = fromEvent(paginationButton, 'click')
            obsPaginationButton.subscribe(() => {
                //Desactivamos mediante CSS todos los botones
                let botones = document.querySelectorAll(".pagination-button")
                botones.forEach(element => {
                    element.classList.remove("active");
                });
                //A cada botón se le asigna la tarea de crear una página mostrando las actividades que le correspondan
                this.pagina(contenedorActividades, index);
                paginationButton.classList.add("active")
            })
            paginationButton.innerHTML = ++index;
            ul.append(paginationButton)
            --index;
        }
        app.container.append(nav);
    }

    //Creación de contenido de las actividades

    crearCard(contenedorActividades) {
        let card = document.createElement("a")
        contenedorActividades.append(card)
        card.classList.add("card", "shadow", "bg-body", "rounded", "text-center")
        card.style.width = "250px"
        card.id = "activityCard"
        return card;
    }

    crearImagen(card, index) {
        let img = document.createElement("img");
        img.classList.add("img", "mt-2")
        if (this.datosActividades[index].gear_id != null) {
            switch (this.datosActividades[index].gear_id) {
                case this.cliente.equipment.btt:
                    img.src = btt
                    break;
                case this.cliente.equipment.road:
                    img.src = road
                    break;
                default:
                    img.src = btt
                    break;
            }
        } else {
            if (this.cliente.equipment === undefined) {
                img.src = question
            } else {
                img.src = running
            }
        }
        card.append(img)
    }

    crearCardBody(card) {
        let cardbody = document.createElement("div");
        cardbody.classList.add("card-body")
        card.append(cardbody);
        return cardbody;
    }

    crearCardTitle(cardBody, index) {
        let cardtitle = document.createElement("h5");
        cardtitle.classList.add("card-title");
        cardtitle.classList.add("h5");
        let activityDate = this.datosActividades[index].start_date_local;
        cardtitle.innerHTML = convertDate(activityDate);
        cardBody.append(cardtitle);
        return cardBody;
    }

    crearCardContent(card, cardbody, index) {
        let cardcontent = document.createElement("ul")
        cardcontent.classList.add("list-group");
        let cardduration = document.createElement("li")
        cardduration.classList.add("list-group-item", "activities")
        cardduration.innerHTML = secondsToString(this.datosActividades[index].elapsed_time)
        let carddistance = document.createElement("li")
        carddistance.classList.add("list-group-item", "activities")
        carddistance.innerHTML = (this.datosActividades[index].distance / 1000).toFixed(2) + " Km"
        cardcontent.append(cardduration);
        cardcontent.append(carddistance)
        cardbody.append(cardcontent)
        card.href = "#/actividad";
        const obsCard = fromEvent(card, 'click')
        obsCard.subscribe(()=> {
            let actividad = JSON.stringify(this.datosActividades[index])
            localStorage.setItem("Actividad", actividad)
        })
    }

    obtenerLimite(index) {

        var limites = {
            0: () => [0, 12],
            1: () => [12, 24],
            2: () => [24, 36],
            3: () => [36, 48],
            4: () => [48, 60],
            5: () => [60, 72],
            6: () => [72, 84],
            7: () => [84, 96],
            8: () => [96, 108],
            9: () => [108, 120],
            10: () => [120, 132],
            11: () => [132, 144],
            12: () => [144, 156],
            13: () => [156, 168],
            14: () => [168, 180],
            15: () => [180, 192],
            16: () => [192, 199]
        }

        return limites[index]();
    }

}
