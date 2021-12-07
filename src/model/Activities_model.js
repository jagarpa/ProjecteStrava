import { Model } from "./Model.js"
import { loadSpinner } from "../functions.js";
export { Activities_model }

class Activities_model extends Model {

    constructor() {
        super()
        this.user = JSON.parse(localStorage.getItem("User"));
    }

    async getActivities() {
        try {
            app.container.classList.add("animate__animated", "animate__backOutRight")

            setTimeout(() => {
                app.container.classList.remove("animate__animated", "animate__backOutRight")
                app.container.classList.add("animate__animated", "animate__fadeIn")
                loadSpinner()
            }, 1000);
            
            const response = await fetch("https://www.strava.com/oauth/token", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: this.user.client_id,
                    client_secret: this.user.client_secret,
                    refresh_token: this.user.refresh_token,
                    grant_type: 'refresh_token'
                })
            })
            const token = await response.json();
            console.log(token)
            const activities = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=${token.access_token}`)
            const activitiesData = await activities.json();
            app.container.classList.remove("animate__animated", "animate__fadeIn")
            setTimeout(() => {  
            }, 1000);
            return activitiesData;
        } catch (error) {
            console.log(error)
        }
    }
}