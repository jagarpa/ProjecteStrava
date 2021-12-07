import { CustomersController } from "../controller/Customers_controller.js";
import { View } from "./View.js"
import { loadSpinner } from "../functions.js";
export { FrontPage_view }

class FrontPage_view extends View {

    constructor() {
        super()
        this.renderView()
    }

    renderView() {
        console.log("FrontView")
        app.container.classList.add("animate__animated", "animate__backOutRight")
        setTimeout(() => {
            app.container.classList.remove("animate__animated", "animate__backOutRight")
            app.container.classList.add("animate__animated", "animate__backInLeft")
            app.container.innerHTML = "";
            app.container.classList.remove("d-flex", "justify-content-center")
            //Aparece el nav
            let nav = document.querySelector("nav")
            nav.style.display = "block";
            let cardContainer = document.createElement("div")
            app.container.append(cardContainer)
            cardContainer.classList.add("container", "d-flex", "flex-wrap", "justify-content-center")
            //Creación de las tarjetas
            let card1 = document.createElement("div")
            let card2 = document.createElement("div")
            let card3 = document.createElement("div")
            let cards = [card1, card2, card3]
    
            cards.map((card) => {
                card.classList.add("card")
                card.id = "homecard"
                cardContainer.append(card)
                card.append(document.createElement("div"))
                let boton = document.createElement("a");
                card.append(boton)
                boton.classList.add("btn", "btn-primary")
                boton.innerHTML = "PRUEBA";
                boton.href = "#/customers"
            })
        }, 500);
    }
}
