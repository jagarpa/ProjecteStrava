import { View } from "./View.js"
import { fromEvent } from 'rxjs'
import { Animations_control } from "../helpers/Animations_control.js"
import { convertirObjeto } from "../functions.js"
import { Delete } from "../components/Delete.js"
import { router } from "../router/router.js"
export { Customers_view }

class Customers_view extends View {

  constructor(data) {
    super()
    this.data = data;
    this.animacion = new Animations_control();
  }

  renderView() {
    window.document.title = "Listado de clientes"
    this.animacion.agregarAnimacionSalida();
    setTimeout(() => {
      //Animaciones 
      this.animacion.eliminarAnimacionSalida();
      this.animacion.agregarAnimacionEntrada();

      //Reset del container principal
      app.container.innerHTML = "";
      app.container.classList.add("d-flex", "justify-content-center")

      //Creación de la página
      const fila = this.crearfila();
      const colIzquierda = this.crearcolIzquierda(fila)
      const colDerecha = this.crearcolDerecha(fila)
      const title = this.crearTitle(colIzquierda);
      const accordion = this.crearAccordion(colDerecha);
      const botonNuevoCliente = this.crearBotonNuevoCliente(colDerecha)
      const customers = convertirObjeto(this.data);

      //Uso de map para crear todos los clientes. 
      //El index se necesita para poder indexar cada cliente para el comportamiento del acordeón
      customers.map((element, index) => {
        const accordionItem = this.crearAccordionItem(accordion);
        const accordionHeader = this.crearAccordionHeader(accordionItem, index);
        const accordionButton = this.crearAccordionButton(accordionHeader, element, index);
        const accordionPlaceHolder = this.crearAccordionPlaceHolder(accordionItem, index);
        const accordionBody = this.crearAccordionBody(accordionPlaceHolder);
        const botonActividades = this.crearBotonActividades(accordionBody, element);
        const botonDatos= this.crearBotonDatos(accordionBody, element);
        const botonEditar = this.crearBotonEditar(accordionBody, element);
        const botonEliminar = this.crearBotonEliminar(accordionBody, element, index); 
      })
    }, 1000);
  }

  //Funciones para crear elementos principales
  crearfila() {
    let fila = document.createElement("div")
    fila.classList.add("row", "mt-4")
    app.container.append(fila)
    return fila;
  }

  crearcolDerecha(fila) {
    let colDerecha;
    colDerecha = document.createElement("div")
    colDerecha.classList.add("col", "text-start")
    colDerecha.id = "colDerecha";
    fila.append(colDerecha);
    return colDerecha;
  }

  crearcolIzquierda(fila) {
    let colIzquierda;
    colIzquierda = document.createElement("div")
    colIzquierda.classList.add("col", "text-end")
    colIzquierda.id = "colIzquierda";
    fila.append(colIzquierda);
    return colIzquierda;
  }

  crearTitle(colIzquierda) {
    let title = document.createElement("h1")
    title.classList.add("display-4", "mt-4")
    title.id = "customerTitle";
    title.innerText = "Clientes con entrenamiento activo"
    colIzquierda.append(title);
    return title;
  }

  crearAccordion(colDerecha) {
    let accordion = document.createElement("div");
      accordion.classList.add("accordion", "accordion-flush", "mt-5", "shadow", "mb-5", "bg-body", "rounded")
      accordion.id = "accordionFlush";
      colDerecha.append(accordion);
      return accordion;
  }

  //Funciones para crear elementos específicos del acordeón

  crearAccordionItem(accordion) {
    let accordionItem = document.createElement("div");
    accordion.append(accordionItem);
    return accordionItem;
  }

  crearAccordionHeader(accordionItem, index) {
    let accordionHeader = document.createElement("h3");
    accordionHeader.id = "flush-heading" + index;
    accordionItem.append(accordionHeader);
    return accordionHeader;
  }

  crearAccordionButton(accordionHeader, element, index) {
    let button = document.createElement("button");
    button.classList.add("accordion-button", "collapsed", "fs-5");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#flush-collapse" + index)
    button.ariaExpanded = "false";
    button.setAttribute("aria-controls", "flush-collapse" + index);
    button.innerHTML = element.name;
    accordionHeader.append(button);
  }

  crearAccordionPlaceHolder(accordionItem, index) {
    let accordionPlaceholder = document.createElement("div");
    accordionPlaceholder.id = "flush-collapse" + index;
    accordionPlaceholder.classList.add("accordion-collapse", "collapse")
    accordionPlaceholder.setAttribute("aria-labelledby", "flush-heading" + index)
    accordionPlaceholder.setAttribute("data-bs-parent", "#accordionFlush")
    accordionItem.append(accordionPlaceholder);
    return accordionPlaceholder;
  }

  crearAccordionBody(accordionPlaceHolder) {
    let accordionBody = document.createElement("div");
    accordionBody.classList.add("accordion-body", "justify-content-between");
    accordionPlaceHolder.append(accordionBody);
    return accordionBody;
  }

  crearBotonActividades(accordionBody, element) {
    let botonActividades = document.createElement("a");
    botonActividades.classList.add("btn-login", "m-2")
    botonActividades.innerHTML = "Actividades"
    botonActividades.href = "#/actividades"
    const obsActividades = fromEvent(botonActividades, 'click')
    obsActividades.subscribe(() => {
      localStorage.setItem("User", JSON.stringify(element))
    })
    accordionBody.append(botonActividades);
  }

  crearBotonDatos(accordionBody, element) {
    let buttonDatosCliente = document.createElement("a");
    buttonDatosCliente.classList.add("btn-login", "m-2")
    buttonDatosCliente.innerHTML = "Datos del cliente"
    buttonDatosCliente.href = "#/datoscliente"
    const obsDatosCliente = fromEvent(buttonDatosCliente, 'click')
    obsDatosCliente.subscribe(() => {
      localStorage.setItem("User", JSON.stringify(element))
    })
    accordionBody.append(buttonDatosCliente);
  }

  crearBotonEditar(accordionBody, element) {
    let buttonEditar = document.createElement("a");
    buttonEditar.classList.add("btn-editar", "m-2")
    buttonEditar.innerHTML = "Editar"
    buttonEditar.href = "#/editarcliente"
    const obsEditar = fromEvent(buttonEditar, 'click')
    obsEditar.subscribe(() => {
      localStorage.setItem("User", JSON.stringify(element))
    })
    accordionBody.append(buttonEditar);
  }

  crearBotonEliminar(accordionBody, element, index) {

    let buttonEliminar = document.createElement("a");
        buttonEliminar.classList.add("btn-eliminar", "m-2")
        buttonEliminar.innerHTML = "Eliminar cliente"
        accordionBody.append(buttonEliminar);
        const obsEliminar = fromEvent(buttonEliminar, 'click')
        obsEliminar.subscribe(() => {
          const id = this.data[index][0]
          const borrar = new Delete();
          borrar.delete(id);
          setTimeout(() => {
            router("#/customers")
          }, 1000);
        })   
  }

  crearBotonNuevoCliente(colDerecha) {
    let boton = document.createElement("a")
    boton.classList.add("btn-login")
    boton.innerHTML = "Añadir un nuevo cliente"
    boton.href = "#/nuevocliente"
    colDerecha.append(boton)
  }

}
