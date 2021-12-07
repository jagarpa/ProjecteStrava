import { Activities_controller } from "../controller/Activities_controller.js";
import { View } from "./View.js"
import Chart from 'chart.js/auto';
export { CustomerData_view }

class CustomerData_view extends View {

    constructor(customer, activities) {
        super()
        this.customer = customer;
        this.activities = activities
        this.renderView()
    }

    renderView() {
        app.container.classList.add("animate__animated", "animate__fadeOut")
        app.container.classList.remove("animate__animated", "animate__fadeOut")
        setTimeout(() => {
            app.container.classList.add("animate__animated", "animate__backOutRight")
            setTimeout(() => {
                app.container.classList.remove("animate__animated", "animate__backOutRight")
                app.container.classList.add("animate__animated", "animate__backInLeft", "container")
                app.container.innerHTML = "";
                app.container.classList.remove("d-flex", "justify-content-center")
                console.log(this.activities)

                let divPrincipal = document.createElement("div")
                divPrincipal.classList.add("row", "mt-4")
                app.container.append(divPrincipal)

                let columnaIzquierda = document.createElement("div")
                columnaIzquierda.classList.add("col-4")
                divPrincipal.append(columnaIzquierda)
                
                let columnaDerecha = document.createElement("div")
                columnaDerecha.classList.add("col-8")
                divPrincipal.append(columnaDerecha)

                let titulo = document.createElement("p")
                titulo.classList.add("display-6")
                titulo.innerHTML = "Información de "+this.customer.name
                columnaIzquierda.append(titulo)

                let grafico = document.createElement("canvas")
                grafico.classList.add("text-center", "mt-4")
                grafico.id = "myChart";
                grafico.style.width = "100%"
                grafico.style.height = "500px"
                columnaDerecha.append(grafico)

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
                    let fecha = element.start_date_local

                    if (fecha.includes("2021-")) {

                        if (fecha.includes("-01-"))
                            enero.push(element)

                        if (fecha.includes("-02-"))
                            febrero.push(element)

                        if (fecha.includes("-03-"))
                            marzo.push(element)

                        if (fecha.includes("-04-"))
                            abril.push(element)

                        if (fecha.includes("-05-"))
                            mayo.push(element)

                        if (fecha.includes("-06-"))
                            junio.push(element)

                        if (fecha.includes("-07-"))
                            julio.push(element)

                        if (fecha.includes("-08-"))
                            agosto.push(element)

                        if (fecha.includes("-09-"))
                            septiembre.push(element)

                        if (fecha.includes("-10-"))
                            octubre.push(element)

                        if (fecha.includes("-11-"))
                            noviembre.push(element)

                        if (fecha.includes("-12-"))
                            noviembre.push(element)
                    }
                }

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
                    document.querySelector('#myChart'),
                    config
                );
            }, 100);
        }, 1000);
    }

}
