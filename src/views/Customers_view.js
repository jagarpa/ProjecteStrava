import { CustomersController } from "../controller/Customers_controller.js";
import { View } from "./View.js"
export { Customers_view }

class Customers_view extends View {

    constructor(data) {
        super()
        this.data = data;
    }

    renderView() {

        app.container.classList.add("animate__animated", "animate__backOutRight")
        setTimeout(() => {
          let customers_array = []
          for (let index = 0; index < this.data.length; index++) {
            customers_array[index] = this.data[index][1]
          }
          console.log(customers_array);
  
          app.container.classList.remove("animate__animated", "animate__backOutRight")
          app.container.classList.add("animate__animated", "animate__backInLeft")
          app.container.innerHTML = "";
      
          let leftcol;
          let rightcol;
    
          app.container.classList.add("d-flex", "justify-content-center")
      
          /* creating row and col */
          let row = document.createElement("div")
          row.classList.add("row", "mt-4")
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
          console.log("PASA EL ACORDEON")
          let cont = 1;
          customers_array.map((element) => {
            console.log(element);
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
            button.innerHTML = element.name;
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
      
            button = document.createElement("a");
            button.classList.add("btn", "btn-outline-dark", "m-2")
            button.innerHTML = "Actividades"
            button.href = "#/actividades"
            button.addEventListener("click", ()=> {
              localStorage.setItem("User", JSON.stringify(element))
            })
            accordionBody.append(button);
      
            button = document.createElement("a");
            button.classList.add("btn", "btn-outline-dark", "m-2")
            button.innerHTML = "Datos del cliente"
            accordionBody.append(button);
            button.href = "#/datoscliente"
            button.addEventListener("click", () => {
              localStorage.setItem("User", JSON.stringify(element))
            })
      
            button = document.createElement("button");
            button.classList.add("btn", "btn-outline-danger", "m-2")
            button.innerHTML = "Eliminar cliente"
            accordionBody.append(button);
            button.addEventListener("click", () => {
              alert(element.name)
            })

            button = document.createElement("button");
            button.classList.add("btn", "btn-outline-danger", "m-2")
            button.innerHTML = "Editar"
            accordionBody.append(button);
            button.href = "#/editarcliente"
            button.addEventListener("click", () => {
              localStorage.setItem("User", JSON.stringify(element))
            })

            cont++;
        })
        
        let boton = document.createElement("a")
        boton.classList.add("btn-login")
        boton.innerHTML = "Añadir un nuevo cliente"
        boton.href = "#/nuevocliente"
        rightcol.append(boton)
    
        /* Creación de gráfico */



        }, 1000);  
    }

      
}
