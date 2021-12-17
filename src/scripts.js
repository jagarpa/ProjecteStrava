import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "animate.css"
import { key} from "./firebaseAPIkey/FirebaseKey.js"

import { initializeApp } from "firebase/app"
import { router } from "./router/router.js"

window.app = {};
app.container = ""; 
app.mocha = "";
app.token = "";
app.config = "";

//Funcions autoinvocades
(() => {
    document.addEventListener("DOMContentLoaded", function domLoad() {

        //Firebase
        const firebaseConfig = key;
          
        app.config = firebaseConfig
    
        // Initialize Firebase
        const appFirebase = initializeApp(firebaseConfig);
    
        app.container = document.querySelector("#container");
        app.mocha = document.querySelector("#mocha")
        
        router("#/login")
    });
  
    window.addEventListener("hashchange", () => router(window.location.hash));
  })();

