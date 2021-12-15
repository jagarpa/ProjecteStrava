import { View } from "./View.js"
import { Animations_control } from "../helpers/Animations_control.js";
import cyclist from "../images/cyclist.jpg"
export { FrontPage_view }

class FrontPage_view extends View {

    constructor() {
        super()
        this.animacion = new Animations_control();
        this.renderView()
    }

    renderView() {
        window.document.title = "Bienvenido"
        window.location.hash = "#/principal"
        this.animacion.agregarAnimacionSalida();
        setTimeout(() => {
            this.animacion.eliminarAnimacionSalida();
            this.animacion.agregarAnimacionEntrada();
            app.container.innerHTML = "";
            app.container.classList.remove("d-flex", "justify-content-center")
            //Aparece el nav
            let nav = document.querySelector("nav")
            nav.style.display = "block";

            let div = document.createElement("div")
            app.container.append(div)
            div.classList.add("row", "text-center", "mt-4") 

            let bienvenida = document.createElement("div")
            bienvenida.classList.add("display-4", "col-12")
            bienvenida.innerHTML = "Bienvenido"
            div.append(bienvenida)

            let imagen = document.createElement("div")
            imagen.classList.add("col-12", "text-center")
            div.append(imagen)

            let img = document.createElement("img")
            img.classList.add("mt-4", "img", "shadow", "rounded")
            img.src = cyclist
            imagen.append(img)

        }, 500);
    }
}
