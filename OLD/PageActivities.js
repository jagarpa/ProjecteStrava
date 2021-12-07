import { HeartZones } from "../data/HeartZones.js";
import { PageCustomers } from "./PageCustomers.js";
import { secondsToString } from "../functions.js";
import { convertDate } from "../functions.js";
import { PageError } from "../pages/PageError.js"
import { loadSpinner } from "../functions.js";
export { PageActivities };

class PageActivities {

    constructor(customer) {
        this.customer = customer;
    }

    async getActivities() {
        try {
            console.log("ENTRA")
            loadSpinner(app.container)
            const response = await fetch("https://www.strava.com/oauth/token", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: this.customer.client_id,
                    client_secret: this.customer.client_secret,
                    refresh_token: this.customer.refresh_token,
                    grant_type: 'refresh_token'
                })
            })
            const token = await response.json();
            console.log(token)
            const activities = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=${token.access_token}`)
            const activitiesData = await activities.json();

            this.renderActivitiesPage(activitiesData)
        } catch (error) {
            console.log(error)
            new PageError(error);
        }
    }

    renderActivitiesPage(activitiesData) {
        app.container.innerHTML = "";
        let containerActivities = document.createElement("div")
        containerActivities.classList.add("d-flex", "flex-wrap", "align-content-start", "justify-content-center")
        let tituloDiv = document.createElement("div")
        tituloDiv.classList.add("text-center")
        let titulo = document.createElement("h1")
        titulo.classList.add("display-6", "mt-4")
        titulo.innerHTML = "Panel de actividades de " + this.customer.name;
        tituloDiv.append(titulo)
        app.container.append(tituloDiv);
        

        //Creamos los botones de paginación
        let nav = document.createElement("nav")
        nav.id = "nav-pagination-activities"
        let ul = document.createElement("ul")
        ul.classList.add("pagination", "pagination-lg", "justify-content-center")
        nav.append(ul);
        let numberOfButtons = Math.ceil(activitiesData.length / 12)
        let button = document.createElement("button")
        button.innerHTML = "Volver a clientes"
        button.classList.add("btn", "btn-dark", "mt-1")
        ul.append(button)
        button.addEventListener("click", function () {
            new PageCustomers()
        })
        for (let index = 0; index < numberOfButtons; index++) {
            let paginationButton = document.createElement("button")
            paginationButton.classList.add("btn", "btn-dark", "pagination-button", "justify-content-center", "pagination-button")
            paginationButton.style.margin = "5px"
            paginationButton.addEventListener("click", () => {
                let botones = document.querySelectorAll(".pagination-button")
                botones.forEach(element => {
                    element.classList.remove("active");
                });
                this.pagina(activitiesData, containerActivities, index);
                paginationButton.classList.add("active")
            })
            paginationButton.innerHTML = ++index;
            ul.append(paginationButton)
            --index;
        }

        //Cargamos la primera página de actividades
        this.pagina(activitiesData, containerActivities, 0)

        app.container.append(containerActivities)
        app.container.append(nav);
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

    pagina(activitiesData, containerActivities, index) {
        let limites = this.obtenerLimite(index);
        containerActivities.innerHTML = "";
        console.log(activitiesData)
        for (let index = limites[0]; index < limites[1]; index++) {
            let card = document.createElement("div")
            containerActivities.append(card)
            card.classList.add("card", "shadow", "bg-body", "rounded", "text-center")
            card.style.width = "250px"
            card.id = "activityCard"
            let img = document.createElement("img");
            img.classList.add("img", "mt-2")
            var that = this.customer;
            if (activitiesData[index].gear_id != null) {
                switch (activitiesData[index].gear_id) {
                    case that.equipment[0].btt:
                        img.src = "./images/btt.png"
                        break;
                    case that.equipment[0].road:
                        img.src = "./images/road.png"
                        break;
                    default:
                        img.src = "./images/btt.png"
                        break;
                }
            } else {
                if (that.equipment === undefined) {
                    img.src = "./images/question.png"
                } else {
                    img.src = "./images/running.png"
                }
            }
            card.append(img)
            let cardbody = document.createElement("div");
            cardbody.classList.add("card-body")
            card.append(cardbody);
            let cardtitle = document.createElement("h5");
            cardtitle.classList.add("card-title");
            cardtitle.classList.add("h5");
            let activityDate = activitiesData[index].start_date_local;
            cardtitle.innerHTML = convertDate(activityDate);
            cardbody.append(cardtitle);
            let cardcontent = document.createElement("ul")
            cardcontent.classList.add("list-group");
            let cardduration = document.createElement("li")
            cardduration.classList.add("list-group-item")
            cardduration.innerHTML = secondsToString(activitiesData[index].elapsed_time)
            let carddistance = document.createElement("li")
            carddistance.classList.add("list-group-item")
            carddistance.innerHTML = (activitiesData[index].distance / 1000).toFixed(2) + " Km"
            cardcontent.append(cardduration);
            cardcontent.append(carddistance)
            cardbody.append(cardcontent)
            let datos = activitiesData;
            card.addEventListener("click", () => new HeartZones(datos[index], app.container, this.customer))
        }
    }
}