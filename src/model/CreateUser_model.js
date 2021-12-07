import { Model } from "./Model.js"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorPage } from "../components/ErrorPage.js";
export { CreateUser_model }

class CreateUser_model extends Model {

    constructor(email, password) {
        super()
        this.email = email;
        this.password = password;
        this.createUser()
    }

    createUser() { 
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert("Usuario creado OK")
            })
            .catch((error) => {
                new ErrorPage(error.code, error.message)
            });
    }
}