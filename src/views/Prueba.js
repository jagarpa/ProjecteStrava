import { decodePolyline } from "../functions.js";
import { coordinatesFilter } from "../functions.js";
export { Prueba }

class Prueba {

  constructor(activity) {
    this.activity = activity;
    this.heartData = "";
    this.renderActivityDetailsPage()
  }

  renderActivityDetailsPage() {

    app.container.innerHTML = "";


    //Mapa
    let mapcontainer = document.createElement("div");
    mapcontainer.id = "mapcontainer";
    console.log("Pasa los calculos del polyline 1")
    mapcontainer.classList.add("shadow", "rounded", "mt-4");
    app.container.append(mapcontainer);

    let mapdiv = document.createElement("div")
    mapdiv.id = "map";
    mapcontainer.append(mapdiv);
    let dataMapSummary_encoded = this.activity.map.summary_polyline;
    let coordinates_decoded = decodePolyline(dataMapSummary_encoded);
    let coordinatesDivisor = (coordinates_decoded.length % 2 == 0) ? coordinates_decoded.length : coordinates_decoded.length + 1;
    let latitudeActivity = coordinates_decoded[coordinatesDivisor / 2].latitude;
    let longitudeActivity = coordinates_decoded[coordinatesDivisor / 2].longitude;
    let coordinatesFiltered = coordinatesFilter(coordinates_decoded);
    console.log(document.body)
    console.log("Pasa los calculos del polyline 3")
    let src = `L.mapbox.accessToken = 'pk.eyJ1IjoiZGpqYXZpZyIsImEiOiJja3VyZmI0ZnUwd3llMnFwNXp6a2c4bWc1In0.GHFEHp5qLR_8GluAxjGMLA'; 
        var map = L.mapbox.map('map')
        .setView([${latitudeActivity}, ${longitudeActivity}], 12)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11')); 
        var line_points = ${JSON.stringify(coordinatesFiltered)};
        var polyline_options = {
            color: '#880000', weight: 5
        };var polyline = L.polyline(line_points, polyline_options).addTo(map);console.log(L)`;

    let script = document.createElement("script");
    script.onload = function () { };
    script.innerHTML = src;
    script.onload();
    document.body.append(script);
    backbutton = document.createElement("button")
    main.append(backbutton);
    backbutton.id = "backButtonCustomers";
    backbutton.classList.add("btn", "btn-outline-dark", "btn-lg", "mt-4")
    backbutton.innerHTML = "Volver";

  }
}
