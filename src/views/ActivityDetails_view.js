import { decodePolyline } from "../functions.js";
import { coordinatesFilter } from "../functions.js";
export { ActivityDetails_view }

class ActivityDetails_view {

  constructor(activity) {
    this.activity = activity;
    this.renderActivityDetailsPage()
  }

  renderActivityDetailsPage() {
    app.container.classList.add("animate__animated", "animate__backOutRight")

    setTimeout(() => {

      app.container.classList.remove("animate__animated", "animate__backOutRight")
      app.container.classList.add("animate__animated", "animate__backInLeft")
      app.container.innerHTML = "";

      /* 
          let div = document.createElement("div");
          div.className = "container";
          app.container.append(div);
      
          let row = document.createElement("div");
          row.classList.add("row", "mt-3");
          div.append(row);
      
          //Columna de la izquierda
          let leftcol = document.createElement("div")
          leftcol.classList.add("col-8")
          leftcol.id = "leftColDetails";
          row.append(leftcol);
      
          //Columna de la derecha
          let rightcol = document.createElement("div")
          rightcol.classList.add("col-4", "text-center")
          rightcol.id = "rightColDetails";
          row.append(rightcol);
      
          let canvasTitle = document.createElement("h6")
          rightcol.append(canvasTitle)
      
          //Canvas
          let canvas = document.createElement("canvas")
          canvas.id = "pieChart";
          canvas.classList.add("shadow", "p-3", "md-5", "bg-body", "rounded")
          rightcol.append(canvas);
      
          if (this.heartData.message === "Payment Required") {
            console.log("A PAGAR")
          } else {
            canvasTitle.innerHTML = "Zonas de frecuencia cardiaca (minutos)";
            var src = `var ctxP = document.getElementById("pieChart").getContext('2d');
              let zona1 = ${this.heartData[0].distribution_buckets[0].time};
              let zona2 = ${this.heartData[0].distribution_buckets[1].time};
              let zona3 = ${this.heartData[0].distribution_buckets[2].time};
              let zona4 = ${this.heartData[0].distribution_buckets[3].time};
              let zona5 = ${this.heartData[0].distribution_buckets[4].time};
              var myPieChart = new Chart(ctxP, {
                type: 'pie',
                data: {
                  labels: ["Zona 1", "Zona 2", "Zona 3", "Zona 4", "Zona 5"],
                  datasets: [{
                    data: [Math.trunc(zona1 / 60), Math.trunc(zona2 / 60), Math.trunc(zona3 / 60), Math.trunc(zona4 / 60), Math.trunc(zona5 / 60)],
                    backgroundColor: ["#009BFF", "#04FF00", "#FFE200", "#FF7E00", "#FF0000"],
                    hoverBackgroundColor: ["#71C7FF", "#92FF90", "#FFEF73", "#FFB46A", "#FF7A7A"]
                  }]
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        font: {
                          size: 25
                        }
                      }
                    }
      
                  }
                }
              });`
            var script = document.createElement("script");
            script.onload = function () { };
            script.innerHTML = src;
            script.onload();
            document.body.append(script);
          } */
      
          //Mapa
          let mapcontainer = document.createElement("div");
          mapcontainer.id = "mapcontainer";
          mapcontainer.classList.add("shadow", "rounded", "mt-4");
          app.container.append(mapcontainer);
      
          let mapdiv = document.createElement("div")
          mapdiv.id = "map";
          mapcontainer.append(mapdiv);
      
          let dataMapSummary_encoded = this.activity.map.summary_polyline;
      
          let coordinates_decoded = decodePolyline(dataMapSummary_encoded);
          console.log(coordinates_decoded);
      
          let keycoordinates = [];
          let long = coordinates_decoded.length
          coordinates_decoded.forEach(element => {
      
                if (long%2==0) {
      
                  keycoordinates[0] = coordinates_decoded[0]
                  keycoordinates[1] = coordinates_decoded[long*0.25]
                  keycoordinates[2] = coordinates_decoded[long*0.2]
                  keycoordinates[3] = coordinates_decoded[long-1]
      
                }
            
          });
      
          let coordinatesDivisor = (coordinates_decoded.length % 2 == 0) ? coordinates_decoded.length : coordinates_decoded.length + 1;
          let latitudeActivity = coordinates_decoded[coordinatesDivisor / 2].latitude;
          let longitudeActivity = coordinates_decoded[coordinatesDivisor / 2].longitude;
          let coordinatesFiltered = coordinatesFilter(coordinates_decoded);
          console.log("antes del src")
          var src = `L.mapbox.accessToken = 'pk.eyJ1IjoiZGpqYXZpZyIsImEiOiJja3VyZmI0ZnUwd3llMnFwNXp6a2c4bWc1In0.GHFEHp5qLR_8GluAxjGMLA'; 
              var map = L.mapbox.map('map')
              .setView([${latitudeActivity}, ${longitudeActivity}], 12)
              .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11')); 
              var line_points = ${JSON.stringify(coordinatesFiltered)};
              var polyline_options = {
                  color: '#880000', weight: 5
              };var polyline = L.polyline(line_points, polyline_options).addTo(map);console.log(L)`;
      
          var script = document.createElement("script");
          script.onload = function () { };
          script.innerHTML = src;
          script.onload();
          document.body.append(script);
    }, 1000);
  }
}
