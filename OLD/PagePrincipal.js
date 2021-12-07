import { PageCustomers } from "./PageCustomers.js";

export { PagePrincipal}

class PagePrincipal {

    constructor() {
        this.renderPrincipalPage();
    }

    renderPrincipalPage() {
        app.container.innerHTML = "";
        console.log(app.container)
        let cardContainer = document.createElement("div")
        app.container.append(cardContainer)
        cardContainer.classList.add("container", "d-flex", "flex-wrap", "justify-content-center")
        //Creación de las tarjetas
        let card1 = document.createElement("div")
        let card2 = document.createElement("div")
        let card3 = document.createElement("div")
        let cards = [card1, card2, card3]
        
        cards.map((card)=> {
          console.log(card.childNodes)
          card.classList.add("card")
          card.id = "homecard"
          cardContainer.append(card)
          card.append(document.createElement("div"))
          card.addEventListener("click", function() {
            let customers = new PageCustomers();
            customers.getCustomers();
          })
        })

    }
}