import { View } from "./View.js"
import Chart from 'chart.js/auto';
import { Animations_control } from "../helpers/Animations_control.js";
import { fromEvent } from 'rxjs'
export { CustomerData_view }

class CustomerData_view extends View {

    constructor(customer, activities) {
        super()
        this.customer = customer;
        this.activities = activities
        this.animacion = new Animations_control();
        this.renderView()
    }

    renderView() {
        window.document.title = this.customer.name
        this.animacion.agregarAnimacionSalidaSpinner();
        this.animacion.eliminarAnimacionSalidaSpinner();
        setTimeout(() => {
            this.animacion.agregarAnimacionSalida();
            setTimeout(() => {
                this.animacion.eliminarAnimacionSalida();
                this.animacion.agregarAnimacionEntrada();
                app.container.innerHTML = "";
                app.container.classList.remove("d-flex", "justify-content-center")
                console.log(this.activities)

                let divPrincipal = document.createElement("div")
                divPrincipal.classList.add("row", "mt-4")
                app.container.append(divPrincipal)

                let columnaIzquierda = document.createElement("div")
                columnaIzquierda.classList.add("col-5")
                divPrincipal.append(columnaIzquierda)
                columnaIzquierda.innerHTML = 
                `<p class="fs-3 text-end">Información de ${this.customer.name}</p>
                <ol class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Nombre completo:</div>
                  ${this.customer.name}
                </div>
              </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Strava Id:</div>
                    ${this.customer.client_id}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Strava Client Secret:</div>
                    ${this.customer.client_secret}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Strava Refresh Token:</div>
                    ${this.customer.refresh_token}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">Id bicicleta de carretera;</div>
                    ${this.customer.equipment.road}
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">Id bicicleta de montaña:</div>
                    ${this.customer.equipment.btt}
                </div>
                </li>
              </ol>`

/*                 const boton = document.querySelector(".prueba")
                const prueba = fromEvent(boton, "click")
                prueba.subscribe(()=> {
                    let hola = document.querySelector('#myChart')
                    this.crearGrafico("")
                }) */
                
                let columnaDerecha = document.createElement("div")
                columnaDerecha.classList.add("col-7")
                divPrincipal.append(columnaDerecha)

                let grafico = document.createElement("canvas")
                grafico.classList.add("text-center", "mt-2")
                grafico.id = "myChart";
                grafico.style.width = "100%"
                grafico.style.height = "445px"
                columnaDerecha.append(grafico)

                this.crearGrafico("fecha")

                let divInferior = document.createElement("div")
                divInferior.classList.add("container")
                app.container.append(divInferior)

                let boton = `<button class="btn btn-warning bu">Desnivel acumulado</button>`
                divInferior.append(boton)
                divInferior.innerHTML = boton;
                let bu = document.querySelector(".bu")
                bu.addEventListener("click", ()=> {
                    let grafico = document.querySelector('#myChart');
                    grafico.innerHTML = ""
                    this.crearGrafico("desnivel")
                })
                
            }, 100);
        }, 1000);
    }

    crearGrafico(valor) {

        const labels = this.getListaMeses()

        let enero = []
        let febrero = []
        let marzo = []
        let abril = []
        let mayo = []
        let junio = []
        let julio = []
        let agosto = []
        let septiembre = []
        let octubre = []
        let noviembre = []
        let diciembre = []

        for (let k = 0; k < this.activities.length; k++) {
            const element = this.activities[k];

            let info;
            switch (valor) {
                case "desnivel":
                    info = element.total_elevation_gain
                    break;
                case "fecha":
                    info = element.start_date_local
                    break;
                default:
                    break;
            }
            let fecha = element.start_date_local

            if (fecha.includes("2021-")) {

                if (fecha.includes("-01-"))
                    enero.push(info)

                if (fecha.includes("-02-"))
                    febrero.push(info)

                if (fecha.includes("-03-"))
                    marzo.push(info)

                if (fecha.includes("-04-"))
                    abril.push(info)

                if (fecha.includes("-05-"))
                    mayo.push(info)

                if (fecha.includes("-06-"))
                    junio.push(info)

                if (fecha.includes("-07-"))
                    julio.push(info)

                if (fecha.includes("-08-"))
                    agosto.push(info)

                if (fecha.includes("-09-"))
                    septiembre.push(info)

                if (fecha.includes("-10-"))
                    octubre.push(info)

                if (fecha.includes("-11-"))
                    noviembre.push(info)

                if (fecha.includes("-12-"))
                    diciembre.push(info)
            }
        }
        console.log(noviembre)
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Actividades mensuales',
                    data: [enero.length, febrero.length, marzo.length, abril.length, mayo.length, junio.length, julio.length, agosto.length, septiembre.length, octubre.length, noviembre.length, diciembre.length],
                    backgroundColor: [
                     '#434343'
                    ],
                    borderColor: [
                        '#434343'
                    ],
                    borderWidth: 3
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {}
        };

        const myChart = new Chart(
            document.querySelector('#myChart').getContext("2d"),
            config
        );
    }

    getListaMeses() {
        const labels = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];

        return labels;
    }

}
