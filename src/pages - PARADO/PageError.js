export { PageError }

class PageError {

    constructor(error) {
        this.error = error;
        this.printError();
    }

    printError() {
        app.container.innerHTML = "";
        let titulo = document.createElement("h1")
        titulo.classList = "display-6 mt-4";
        let subtitulo = document.createElement("h6")
        subtitulo.classList = "h4";
        let imagen = document.createElement("img")
        imagen.src = "../images/caution.png";
        imagen.classList = "mt-4"

        let errors = {
            "Login": "¡Vaya! Hay un error con el login",
            "Datos": "¡Vaya! Hay un error con los datos"
        }
        titulo.innerHTML = errors[this.error];
        subtitulo.innerHTML = this.error

        app.container.append(imagen)
        app.container.append(titulo);
        app.container.append(subtitulo);
    }
}