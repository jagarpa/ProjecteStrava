
import { Animations_control } from "../helpers/Animations_control.js";
import { View } from "./View.js"
export { CreateUser_view }

class CreateUser_view extends View {

    constructor(data) {
        super()
        this.animacion = new Animations_control();
        this.data = data;
    }

    renderView() {

        this.animacion.agregarAnimacionSalida();
        
        setTimeout(() => {

            this.animacion.eliminarAnimacionSalida()
            this.animacion.agregarAnimacionEntrada();
            app.container.innerHTML = "";
            app.container.innerHTML = `
            <div class="input-group mb-3">
                <span class="input-group-text" id="email">Email</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="password">Password</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <button type="button" class="btn btn-primary">Crear</button>`

        }, 1000);
    }


}
