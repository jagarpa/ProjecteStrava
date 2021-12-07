import { getAuth, signOut } from "firebase/auth";
import { Login } from "../components/Login.js";
export { SignOut }

class SignOut {

    constructor() { 
        this.signout();
    }

    signout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Ha cerrado la sesión")
            localStorage.clear();
            window.location.hash = ""
            new Login()
        }).catch((error) => {
            console.log(error)
        });
    }

}