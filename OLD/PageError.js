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

        titulo.innerHTML = "¡Vaya! No se ha podido acceder a los datos";
        subtitulo.innerHTML = this.error

        app.container.append(imagen)
        app.container.append(titulo);
        app.container.append(subtitulo);

    }
}