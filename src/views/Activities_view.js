import { View } from "./View.js"
import { convertDate } from "../functions.js";
import { secondsToString } from "../functions.js";
import btt from "../images/btt.png";
import road from "../images/road.png";
import running from "../images/running.png"
import question from "../images/question.png"

export { Activities_view }

class Activities_view extends View {

    constructor(activitiesData) {
        super()
        this.customer = JSON.parse(localStorage.getItem("User"));
        this.activitiesData = activitiesData;
    }

    renderView() {
        app.container.classList.add("animate__animated", "animate__fadeOut")
        app.container.classList.remove("animate__animated", "animate__fadeOut")
        setTimeout(() => {
            app.container.classList.add("animate__animated", "animate__backOutRight")
            setTimeout(() => {
                app.container.classList.remove("animate__animated", "animate__backOutRight")
                app.container.classList.add("animate__animated", "animate__backInLeft")
                app.container.innerHTML = "";
                app.container.classList.remove("d-flex", "justify-content-center")
                app.container.classList.remove("container")
                let containerActivities = document.createElement("div")
                containerActivities.classList.add("d-flex", "flex-wrap", "align-content-start", "justify-content-center", "mt-4",  "animate__animated", "animate__fadeInLeft")
                let tituloDiv = document.createElement("div")
                tituloDiv.classList.add("text-center")
                let titulo = document.createElement("h1")
                titulo.classList.add("display-6", "mt-4", "activities-title")
                titulo.innerHTML = "Panel de actividades de " + this.customer.name;
                tituloDiv.append(titulo)
                app.container.append(tituloDiv);
        
                //Creamos los botones de paginación
                let nav = document.createElement("nav")
                nav.classList.add("animate__animated", "animate__fadeInRight", "paginacion")
                nav.id = "nav-pagination-activities"
                let ul = document.createElement("ul")
                ul.classList.add("pagination", "pagination-lg", "justify-content-center")
                nav.append(ul);
                let numberOfButtons = Math.ceil(this.activitiesData.length / 12)
                
                for (let index = 0; index < numberOfButtons; index++) {
                    let paginationButton = document.createElement("button")
                    paginationButton.classList.add("btn", "btn-dark", "pagination-button", "pagination-button")
                    paginationButton.addEventListener("click", () => {
                        let botones = document.querySelectorAll(".pagination-button")
                        botones.forEach(element => {
                            element.classList.remove("active");
                        });
                        this.pagina(containerActivities, index);
                        paginationButton.classList.add("active")
                    })
                    paginationButton.innerHTML = ++index;
                    ul.append(paginationButton)
                    --index;
                }
        
                //Cargamos la primera página de actividades
                this.pagina(containerActivities, 0)
                app.container.append(containerActivities)
                app.container.append(nav);
              }, 100);
        }, 1000);
    }

    pagina(containerActivities, index) {
        let limites = this.obtenerLimite(index);
        containerActivities.innerHTML = "";
        console.log(this.activitiesData)
        console.log(this.customer)
        for (let index = limites[0]; index < limites[1]; index++) {
            let card = document.createElement("a")
            containerActivities.append(card)
            card.classList.add("card", "shadow", "bg-body", "rounded", "text-center")
            card.style.width = "250px"
            card.id = "activityCard"
            let img = document.createElement("img");
            img.classList.add("img", "mt-2")
            if (this.activitiesData[index].gear_id != null) {
                switch (this.activitiesData[index].gear_id) {
                    case this.customer.equipment.btt:
                        img.src = btt
                        break;
                    case this.customer.equipment.road:
                        img.src = road
                        break;
                    default:
                        img.src = btt
                        break;
                }
            } else {
                if (this.customer.equipment === undefined) {
                    img.src = question
                } else {
                    img.src = running
                }
            }
            card.append(img)
            let cardbody = document.createElement("div");
            cardbody.classList.add("card-body")
            card.append(cardbody);
            let cardtitle = document.createElement("h5");
            cardtitle.classList.add("card-title");
            cardtitle.classList.add("h5");
            let activityDate = this.activitiesData[index].start_date_local;
            cardtitle.innerHTML = convertDate(activityDate);
            cardbody.append(cardtitle);
            let cardcontent = document.createElement("ul")
            cardcontent.classList.add("list-group");
            let cardduration = document.createElement("li")
            cardduration.classList.add("list-group-item", "activities")
            cardduration.innerHTML = secondsToString(this.activitiesData[index].elapsed_time)
            let carddistance = document.createElement("li")
            carddistance.classList.add("list-group-item", "activities")
            carddistance.innerHTML = (this.activitiesData[index].distance / 1000).toFixed(2) + " Km"
            cardcontent.append(cardduration);
            cardcontent.append(carddistance)
            cardbody.append(cardcontent)
            card.href = "#/actividad";
            card.addEventListener("click", ()=>{
                let actividad = JSON.stringify(this.activitiesData[index])
                localStorage.setItem("Actividad", actividad)

            })
        }
    }

    obtenerLimite(index) {

        var limites = {
            0: ()=> [0, 12],
            1: ()=> [12, 24],
            2: ()=> [24, 36],
            3: ()=> [36, 48],
            4: ()=> [48, 60],
            5: ()=> [60, 72],
            6: ()=> [72, 84],
            7: ()=> [84, 96],
            8: ()=> [96, 108],
            9: ()=> [108, 120],
            10: ()=> [120, 132],
            11: ()=> [132, 144],
            12: ()=> [144, 156],
            13: ()=> [156, 168],
            14: ()=> [168, 180],
            15: ()=> [180, 192],
            16: ()=> [192, 199]
        }

        return limites[index]();
    }
      
}
