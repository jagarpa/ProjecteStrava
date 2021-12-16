import { ErrorPage } from "./ErrorPage";
export { Delete }

//Uso de clases
class Delete {

    constructor() { 
        this.url = app.config.databaseURL;
        this.token = JSON.parse(localStorage.getItem("Token"));
    }
    //API REST
    //Firebase
    async delete(id) {
        const idToken = this.token._tokenResponse.idToken
        try {
            const response = await fetch(`${this.url}/users/${id}.json?auth=${idToken}`, {
                method: "delete",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: {},
               })
            const data = await response.json();
        } catch (error) {
            new ErrorPage("", error)
        }
    }
}