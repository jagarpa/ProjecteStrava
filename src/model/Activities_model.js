import { Model } from "./Model.js"
import { loadSpinner } from "../functions.js";
import { Animations_control } from "../helpers/Animations_control.js";
import { ErrorPage } from "../components/ErrorPage.js"
export { Activities_model }

class Activities_model extends Model {

    constructor() {
        super()
        this.user = JSON.parse(localStorage.getItem("User"));
        this.animacion = new Animations_control();
    }

    async getActivities() {
        //Creación de un objeto literal utilizando los datos de otro objeto
        const user = {
            client_id: this.user.client_id,
            client_secret: this.user.client_secret,
            refresh_token: this.user.refresh_token,
            grant_type: 'refresh_token'
        }

        //Uso de setTimeout para controlar las animaciones y cargar el spinner de carga
        //Uso de fetch y async await
        try {
            this.animacion.agregarAnimacionSalida();

            setTimeout(() => {
                this.animacion.eliminarAnimacionSalida();
                this.animacion.agregarAnimacionSalidaSpinner();
                loadSpinner()
                this.animacion.eliminarAnimacionSalidaSpinner();
            },500);    

            const response = await fetch("https://www.strava.com/oauth/token", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const token = await response.json();
            const activities = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=${token.access_token}`)
            const activitiesData = await activities.json();
            return activitiesData;
        } catch (error) {
            new ErrorPage("", error)
        }
    }
}