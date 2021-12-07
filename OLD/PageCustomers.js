
import { PageActivities } from "./PageActivities.js";
import { PageError } from "./PageError.js";
export { PageCustomers }

class PageCustomers {

  constructor() {
  }

  async getCustomers() {
    try {
      const RESPONSE = await fetch("./data/customers.json")
      const CUSTOMERS = await RESPONSE.json();
      this.renderCustomersPage(CUSTOMERS);
    } catch (error) {
      new PageError(error)
    }
  }

  renderCustomersPage(customers) {
    console.log(customers)
    app.container.innerHTML = "";
    let leftcol;
    let rightcol;

    /* creating row and col */
    let row = document.createElement("div")
    row.classList = "row container mt-3"
    app.container.append(row)
    leftcol = document.createElement("div")
    leftcol.classList.add("col", "text-end")
    leftcol.id = "leftCol";

    row.append(leftcol);
    rightcol = document.createElement("div")
    rightcol.classList = "col"
    rightcol.id = "rightCol";
    row.append(rightcol);

    let title = document.createElement("h1")
    title.classList.add("display-4", "mt-4")
    title.id = "customerTitle";
    title.innerText = "Clientes con entrenamiento activo"
    leftcol.append(title);

    /* creating bootstrap accordion */
    let accordion = document.createElement("div");
    accordion.classList.add("accordion", "accordion-flush", "mt-5", "shadow", "mb-5", "bg-body", "rounded")
    accordion.id = "accordionFlush";
    rightcol.append(accordion);
    let cont = 1;

    for (const name in customers) {
      if (Object.hasOwnProperty.call(customers, name)) {
        const ELEMENT = customers[name];
        console.log(ELEMENT)
        let accordionItem = document.createElement("div");
        accordion.append(accordionItem);

        let accordionHeader = document.createElement("h3");
        accordionHeader.id = "flush-heading" + cont;
        accordionItem.append(accordionHeader);

        let button = document.createElement("button");
        button.classList.add("accordion-button", "collapsed", "fs-5");
        button.type = "button";
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#flush-collapse" + cont)
        button.ariaExpanded = "false";
        button.setAttribute("aria-controls", "flush-collapse" + cont);
        button.innerHTML = ELEMENT.name;
        accordionHeader.append(button);

        let accordionPlaceholder = document.createElement("div");
        accordionPlaceholder.id = "flush-collapse" + cont;
        accordionPlaceholder.classList.add("accordion-collapse", "collapse")
        accordionPlaceholder.setAttribute("aria-labelledby", "flush-heading" + cont)
        accordionPlaceholder.setAttribute("data-bs-parent", "#accordionFlush")

        accordionItem.append(accordionPlaceholder);

        let accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body", "justify-content-between");
        accordionPlaceholder.append(accordionBody);

        button = document.createElement("button");
        button.classList.add("btn", "btn-outline-dark", "m-2", "btn-lg")
        button.innerHTML = "Ver actividades";
        accordionBody.append(button);
        button.addEventListener("click", ()=> {
          let pageActivities = new PageActivities(ELEMENT);
          pageActivities.getActivities();
        })

        button = document.createElement("button");
        button.classList.add("btn", "btn-outline-dark", "m-2", "btn-lg")
        button.innerHTML = "Ver datos del cliente";
        accordionBody.append(button);
        cont++;
      }
    }
  
    let backbutton = document.createElement("button")
    leftcol.append(backbutton);
    backbutton.id = "backButtonCustomers";
    backbutton.classList.add("btn", "btn-outline-dark", "btn-lg", "mt-4")
    backbutton.innerHTML = "Volver";
  }


}
