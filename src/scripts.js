import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "animate.css"
import { initializeApp } from "firebase/app"
import { router } from "./router/router.js"

window.app = {};
app.container = ""; 
app.mocha = "";
app.token = "";
app.config = "";

(() => {
    document.addEventListener("DOMContentLoaded", function domLoad() {

        //mocha.run();
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
        app.mocha = document.querySelector("#mocha")
        
        router("#/login")
    });

    //window.location.hash = ""
  
    window.addEventListener("hashchange", () => router(window.location.hash));
  })();

