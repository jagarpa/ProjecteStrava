import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "animate.css"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "./router/router.js"
/* Test imports */
import 'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import './tests/tests.js'

/* ---- Test ---- */

export async function firebaseLogin(){
    try {
      console.log("try")
        let user = "djjavig@gmail.com"
        let password = "djjavig"
        const auth = getAuth();
        const TOKEN = await signInWithEmailAndPassword(auth, user, password)
        return TOKEN;
  } catch (error) {
        return null;
      }
   }

export function cups() {
  return "Hola David"
}



/* --------------- */

window.app = {};
app.container = ""; 
app.token = "";
app.pass = "";
app.config = "";

(function autoinvocada() {
    document.addEventListener("DOMContentLoaded", function domLoad() {

        mocha.run();
        //Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyB0Pj3Z81li1LpKrAk4TRSB2LgJ-o2Qdzs",
            authDomain: "frontendapp-a41ad.firebaseapp.com",
            databaseURL: "https://frontendapp-a41ad-default-rtdb.firebaseio.com",
            projectId: "frontendapp-a41ad",
            storageBucket: "frontendapp-a41ad.appspot.com",
            messagingSenderId: "131098470278",
            appId: "1:131098470278:web:2341ef9a41de69daed2e07"
          };
          
        app.config = firebaseConfig
    
          // Initialize Firebase
        const appFirebase = initializeApp(firebaseConfig);
    
        app.container = document.querySelector("#container");
        
        router("#/login")
    });

    window.location.hash = ""
  
    window.addEventListener("hashchange", () => {
      router(window.location.hash);
    });
  })();

