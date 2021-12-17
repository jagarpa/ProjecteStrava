//Decodificar la información polyline obtenida de la actividad
//Programacio funcional
export function decodePolyline(encoded) {
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

//Filtrar archivo coordenadas para hacerlo compatible con mapBox
export function coordinatesFilter(coordinates) {
  let coordinatesFiltered = [];
  coordinates.forEach(element => {
    let object = [];
    object.push(element.latitude);
    object.push(element.longitude);
    coordinatesFiltered.push(object);
  });
  return coordinatesFiltered;
}

//Convertir segundos a formato HORAS:MINUTOS:SEGUNDOS
//Objectes predefinits
export function secondsToString(seconds) {
  let hour = Math.floor(seconds / 3600);
  hour = (hour < 10) ? '0' + hour : hour;
  let minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10) ? '0' + minute : minute;
  let second = seconds % 60;
  second = (second < 10) ? '0' + second : second;
  return hour + ':' + minute + ':' + second;
}

//Convertir fecha a formato DD/MM/AAAA
export function convertDate(date) {
  let array = date.split('-')
  let newDate = array[2].charAt(0) + array[2].charAt(1) + "-" + array[1] + "-" + array[0]
  return newDate;
}

//Spinner de carga
export function loadSpinner() {
    app.container.innerHTML = "";
    let spinDiv = document.createElement("div");
    spinDiv.classList.add("d-flex", "justify-content-center")
    spinDiv.style.marginTop = "250px";
    app.container.append(spinDiv);

    let spinnerElement = document.createElement("div");
    spinnerElement.classList.add("spinner-border", "col-auto", "p-5", "text-center", "spinner")
    spinDiv.append(spinnerElement);

    let span = document.createElement("span");
    span.className = "visually-hidden";
    spinnerElement.append(span);
}

//Filtrar json de clientes
export function convertirObjeto(data) {
  let array = Object.entries(data)
  let customers_array = []
      for (let index = 0; index < array.length; index++) {
        customers_array[index] = array[index][1]
      }
      return customers_array;
}
