export {Animations_control}

class Animations_control {

    //Animacion de ENTRADA
    agregarAnimacionEntrada() {
        app.container.classList.add("animate__animated", "animate__backInLeft")
    }

    //Animación de SALIDA
    agregarAnimacionSalida() {
        app.container.classList.add("animate__animated", "animate__backOutRight")
    }
    
    eliminarAnimacionSalida() {
        app.container.classList.remove("animate__animated", "animate__backOutRight")
    }

    //Animaciones fadeIn/fadeOut para el Spinner de carga
    agregarAnimacionSalidaSpinner() {
        app.container.classList.add("animate__animated", "animate__fadeOut")
    }

    eliminarAnimacionSalidaSpinner() {
        app.container.classList.remove("animate__animated", "animate__fadeOut")
    }
}

