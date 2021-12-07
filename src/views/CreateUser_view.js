
import { View } from "./View.js"
export { CreateUser_view }

class CreateUser_view extends View {

    constructor(data) {
        super()
        this.data = data;
    }

    renderView() {

        app.container.classList.add("animate__animated", "animate__backOutRight")
        setTimeout(() => {

            app.container.classList.remove("animate__animated", "animate__backOutRight")
            app.container.classList.add("animate__animated", "animate__backInLeft")
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
