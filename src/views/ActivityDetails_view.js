import { decodePolyline, secondsToString, coordinatesFilter, convertDate } from "../helpers/functions.js";
import { Animations_control } from "../helpers/Animations_control.js";
export { ActivityDetails_view }
//Mòduls

class ActivityDetails_view {

  constructor(activity) {
    this.activity = activity;
    this.animacion = new Animations_control();
    this.renderActivityDetailsPage()
  }

  renderActivityDetailsPage() {
    window.document.title = "Actividad del "+convertDate(this.activity.start_date_local);
    this.animacion.agregarAnimacionSalida();
    setTimeout(() => {
      this.animacion.eliminarAnimacionSalida()
      this.animacion.agregarAnimacionEntrada();
      app.container.innerHTML = "";

      const divPrincipal = this.crearFila();
      app.container.append(divPrincipal)

      const colDerecha = this.crearColumnaDerecha();
      const colIzquierda = this.crearColumnaIzquierda();
      divPrincipal.append(colIzquierda);
      divPrincipal.append(colDerecha);    
      
      const datosActividad = this.crearDatosActividad();

      colIzquierda.innerHTML = datosActividad;

      //Mapa
      const mapcontainer = document.createElement("div");
      mapcontainer.id = "mapcontainer";
      mapcontainer.classList.add("shadow", "rounded", "mt-4");
      colDerecha.append(mapcontainer);
  
      const mapdiv = document.createElement("div")
      mapdiv.id = "map";
      mapcontainer.append(mapdiv);
  
      const dataMapSummary_encoded = this.activity.map.summary_polyline;
  
      const coordinates_decoded = decodePolyline(dataMapSummary_encoded);
  
      const coordinatesDivisor = (coordinates_decoded.length % 2 == 0) ? coordinates_decoded.length : coordinates_decoded.length + 1;
      const latitudeActivity = coordinates_decoded[coordinatesDivisor / 2].latitude;
      const longitudeActivity = coordinates_decoded[coordinatesDivisor / 2].longitude;
      const coordinatesFiltered = coordinatesFilter(coordinates_decoded);
      //Modificar el nodes
      //Template literal
      //Inyección de código en el DOM
      const src = `L.mapbox.accessToken = 'pk.eyJ1IjoiZGpqYXZpZyIsImEiOiJja3VyZmI0ZnUwd3llMnFwNXp6a2c4bWc1In0.GHFEHp5qLR_8GluAxjGMLA'; 
          var map = L.mapbox.map('map')
          .setView([${latitudeActivity}, ${longitudeActivity}], 12)
          .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11')); 
          var line_points = ${JSON.stringify(coordinatesFiltered)};
          var polyline_options = {
              color: '#880000', weight: 5
          };var polyline = L.polyline(line_points, polyline_options).addTo(map);console.log(L)`;
  
      const script = document.createElement("script");
      script.onload = function () { };
      script.innerHTML = src;
      script.onload();
      app.container.append(script);
    }, 1000);
  }

  crearFila() {
    let div = document.createElement("div")
    div.classList.add("row")
    return div;
  }

  crearColumnaDerecha() {
    let div = document.createElement("div")
    div.classList.add("col-9")
    return div;
  }

  crearColumnaIzquierda() {
    let div = document.createElement("div")
    div.classList.add("col-3", "mt-3")
    return div;
  }

  crearDatosActividad() {
    let list = `
    <p class="fs-3 text-end">${convertDate(this.activity.start_date_local)}
    <ol class="list-group ms-4 mt-4">
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Duración de la actividad (tiempo en movimiento):</div>
        ${secondsToString(this.activity.moving_time)}
      </div>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Media de pulsaciones:</div>
        ${this.activity.average_heartrate} ppm
      </div>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Pulsaciones máximas:</div>
        ${this.activity.max_heartrate} ppm
    </div>
  </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Distancia recorrida:</div>
        ${(this.activity.distance/1000).toFixed(2) + " Km"}
      </div>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Desnivel positivo:</div>
        ${this.activity.total_elevation_gain} m
      </div>
    </li>
    
  </ol>`
  return list;
  }
}
