import { getAuth, signOut } from "firebase/auth";
import { router } from "../router/router.js";
import { ErrorPage } from "./ErrorPage.js";
export { SignOut }

//Uso de clases
class SignOut {
    constructor() { 
        this.signout();
    }

    signout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.clear();
            window.location.hash = "";
            router('#/login')
        }).catch((error) => {
            new ErrorPage("Error al cerrar sesión", error)
        });
    }
}