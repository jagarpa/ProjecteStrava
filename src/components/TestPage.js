import '../tests/tests.js'
import 'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/* ---- Test ---- */

export async function firebaseLogin() {
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

export function decodePolyline() {

    let encoded = 'gmllFhneCMVUIGKoAa@a@B]G_AAc@JQ@eB]y@Wa@Gk@Ec@?a@C{BPuCXc@BcEd@m@@m@Eg@Ii@UaAAa@NYTMBe@DSNO^MP}A`B}@nAOLg@|@eBbCEJc@h@WXGT@^Nr@`@lCd@jCj@xDLlAd@~CPfBEX?f@IPGBW?}@LEGCi@Dq@OqCYqBq@iCc@iAMe@Iy@EwAGy@UgBc@wAYsA]aAs@qCGCE?y@Rm@Bu@Jo@@_CQm@IYM]e@yAiCg@u@gAoB_CuDs@qAc@m@oA{Bc@m@oAqBi@cAOa@ASB[`A}B\aBFORURKRQb@e@VMNALBr@THC?]Ki@Da@?UQg@?EPMfA[JO?WEKcAmB{BmGgAkCG[LUrBkBFA@CASUa@Wo@Kg@Go@Fa@FQv@cBr@kBp@{AFGTEVFnAbAVRdBnB~AxAhAfAbBrAvAz@r@h@t@|@Rh@NRXTRF\@pAKp@B^GZKzD{BZUvAu@XMn@K^Q`@W|Am@|@o@`B{@nDwBtAq@dBgAX?LDRNT`@t@jC`@~@VZd@TPPxAfDNb@h@~BnArCj@dAd@dBVt@Xd@Rf@NRd@hAt@hAh@jAl@`ADP\`@Lp@BVPhD\rBb@~A`@hADX\bAN\Hf@J^\v@T`@E^[\i@HUJOAIDGHAF@d@FLT`BMh@KBIGi@Ee@SIIG?MLCHQNM^OPKt@@J'

    let points = []
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;
    while (index < len) {
      let b, shift = 0, result = 0;
      do {
  
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      let dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;
  
      points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) })
  
    }
    return points
  };


  export function mensajeError(tipo) {
    let mensajes = {
        "nombre": "Este campo solo admite letras",
        "clientid": 'La longitud del "Client ID" de Strava debe ser de 5 números',
        "road": 'La longitud del ID de la bicicleta de carretera debe ser de 8 carácteres o "vacio"',
        "btt": 'La longitud del ID de la bicicleta de montaña debe ser de 8 carácteres o "vacio"'
    }
    return mensajes[tipo]
}

/* --------------- */

export { TestPage }

//Uso de clases
class TestPage {

    constructor() {
        this.cargarTest();
    }

    cargarTest() {
        window.document.title = "Test Mocha/Chai"
        app.container.classList.add("animate__animated", "animate__backOutRight")
        app.mocha.classList.add("animate__animated", "animate__backOutRight")

        setTimeout(() => {
            app.container.classList.remove("animate__animated", "animate__backOutRight")
            app.mocha.classList.remove("animate__animated", "animate__backOutRight")
            app.container.classList.add("animate__animated", "animate__backInLeft")
            app.mocha.classList.add("animate__animated", "animate__backInLeft")
            app.container.innerHTML = "";
            app.mocha.style.display = "block";
            mocha.run()
        }, 1000);

        setTimeout(() => {
            const h2 = Array.from(document.querySelectorAll("h2"));
            h2.map((element) => element.style.color = "white");
            const divSuperior = this.crearDivSuperior();
            const botonAtras = this.crearBotonAtras();
            divSuperior.append(botonAtras)
            app.container.append(divSuperior)
        }, 2000);
    }

    crearDivSuperior() {
        let div = document.createElement("div")
        div.classList.add("d-flex", "justify-content-center")
        return div;
    }

    crearBotonAtras() {
        let boton = document.createElement("a")
        boton.classList.add("btn", "btn-secondary", "mt-4")
        boton.href = "#/login"
        boton.innerHTML = "Volver al login";
        return boton;
    }
}

