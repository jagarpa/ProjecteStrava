import { PageDetails } from "../pages/PageDetails.js";
export { HeartZones }

class HeartZones {

    constructor(activity, container, clientInfo) {
        this.activity = activity;
        this.container = container;
        this.clientInfo = clientInfo;
        this.getHeartrateZones()
    } 

    getHeartrateZones() {
        console.log("Obteniendo los datos sobre pulsaciones y zonas ...")
        fetch("https://www.strava.com/oauth/token", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*", "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: this.clientInfo.client_id,
            client_secret: this.clientInfo.client_secret,
            refresh_token: this.clientInfo.refresh_token,
            grant_type: "refresh_token",
          }),
        })
          .then((res) => res.json())
          .then((res) =>
            fetch(
              `https://www.strava.com/api/v3/activities/${this.activity.id}/zones?access_token=${res.access_token}`
            )
              .then((res) => res.json())
              .then((data) => {
                  console.log("SALIENDO DEL HEARZONES")
                  console.log(this.activitiesData)
                new PageDetails(this.activity, container, this.clientInfo, data)
              })
          );
      }
}