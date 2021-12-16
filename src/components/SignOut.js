import { getAuth, signOut } from "firebase/auth";
import { router } from "../router/router.js";
import { ErrorPage } from "./ErrorPage.js";
export { SignOut }

//MVC
class SignOut {
    constructor() { 
        this.signout();
    }
    //LocalStorage (Clear)
    //API REST (Firebase)
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