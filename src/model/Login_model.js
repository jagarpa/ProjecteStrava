import { Model } from "./Model.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorPage } from "../components/ErrorPage.js";

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
      console.log(TOKEN)
      return TOKEN;
    } catch (error) {
      new ErrorPage(error.code, error.message);
    }
  } 
}