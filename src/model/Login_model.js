import { Model } from "./Model.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorPage } from "../components/ErrorPage.js";
import { Observable } from "rxjs";

export { Login_model }

class Login_model extends Model {

  constructor(user, password) {
    super(user, password)
    this.user = user;
    this.password = password;
    this.login();
  }

  async login() {
    try {
      const auth = getAuth();
      const TOKEN = await signInWithEmailAndPassword(auth, this.user, this.password)
      return TOKEN;
    } catch (error) {
      new ErrorPage(error.code, error.message);
    }
  }  

/*   login() {
    const prueba = new Observable(async (observer) => {
        const auth = getAuth();
        const response = await signInWithEmailAndPassword(auth, this.user, this.password);
        const data = await response.json()
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err))
    })
    prueba.subscribe((data) => console.log(data))
  } */
}