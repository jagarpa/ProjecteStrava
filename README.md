# Descripción
Se trata de una aplicación la cual permita a un entrenador personal poder realizar un seguimiento de las actividades de sus clientes utilizando la app deportiva Strava.

# Librerias y frameworks utilizados
Para este proyecto se ha utilizado:
- Npm
- Webpack
- Rxjs
- Chart.js
- Bootstrap 5
- MapBox
- Strava API
- Firebase
- Mocha
- Chai

# Estructura
Aprovechando el "backend" proporcionado por Firebase, se ha implementado un MVC, donde el controlador llama al modelo para solicitar los datos y luego pasa los datos a la vista.

### Animaciones
Para las transiciones entre páginas se ha utilizado la librería **"Animate.css"** y funciones "setTimeout" para controlar la entrada y salida de estas.

### CSS
Para la apariencia de la página se ha utilizado el framework Bootstrap en su versión 5 y estilos personalizados.

### Router
La clase Router será la encargada de gestionar el "location hash" de nuestra Single Page Application (SPA). Cada vez que el usuario hace click en un botón de tipo <a>, entra en juego el router, procesando el href que posee dicho link, activando el evento "hashchange" asociado a la ventana y procesando la petición correspondiente.


### Firebase
Como "backend" se ha utilizado Firebase, para autenticar y como base de datos. Este se ha implementado combinando FirebaseApp (mediante modulos) y funciones predefinidas facilitadas por el profesor y la documentación de Firebase.

------------


# Páginas
### Bienvenida
La página de bienvenida es una página sencilla, donde una vez procesado el login correctamente, nos muestra mediante una animación el menú superior con las diferentes opciones.


### Login
Al arrancar la aplicación nos aparce la página de login. Para este proyecto, solo se han autorizado desde la API de Firebase 2 usuarios con permisos.
> user: castillo@castilloinformatica.com
> pass: castillo

### Tests
En la página de "login", podemos encontrar un botón que nos dirige a la zona de tests, donde se realizan diversos test utilizando los frameworks de testing **Mocha y Chai.**

Se ejecutan 3 tests:
-  Comprobación de que el login es correcto y el fetch de firebase nos retorna un objeto Token.
- Comprobación de que la función para decodificar el "polyline" de una actividad descargada de la** API de Strava** nos retorna una array.
- Comprobación mensaje de error (String) se retorna correctamente.


### Clientes
Esta página muestra la lista de clientes con entrenamiento activo mediante un "accordion" de Bootstrap 5.
Cada cliente, dispondrá de 3 botones: 
- Actividades: mostrará todas las actividades (hasta un máximo de 200, que es el máximo permitido descargable por la API de Strava) en una nueva página.
- Datos del cliente: mostrará los datos del cliente, así como gráficos con resúmenes anuales.
- Eliminar cliente: Al pulsar sobre eliminar cliente, el cliente será eliminado de la base de datos.

Por último encontramos el boton "añadir nuevo cliente", el cual nos redirige a una nueva página con distintas opciones.

### Datos de cliente
Podremos encontrar diferente información respecto a los datos de cada cliente, así como varios gráficos generados con la libreria **Chart.js**

### Añadir nuevo cliente
En esta página encontraremos un sencillo formulario, el cual reacciona a cualquier cambio que se produzca en el, avisándonos en todo momento de en que estado se encuentra (Color rojo, color verde y mensajes). El formulario comprueba por cada pulsación que realicemos:
- Si el campo nombre no está vacío
- Si el Strava Client Secret no está vacío y su contenido tiene 40 carácteres, indicándonos en todo momento cuantos carácteres nos faltan o si nos hemos pasado
- Si el Strava Client ID es un número de 5 dígitos
- Si el Strava Refresh Token no está vacío y su contenido tiene 40 carácteres, indicándonos en todo momento cuantos carácteres nos faltan o si nos hemos pasado
- Si los campos de Bicicleta de Carretera y Bicicleta de Montaña tienen un código con 8 dígitos o, en su defecto, la palabra "vacio".

Cuando el formulario detecta que todos los campos son correctos (en color verde), nos mostrará mediante una animación el boton de "Confirmar" y es entonces cuando podremos realizar el "set" a la base de datos de Firebase con nuestro nuevo cliente. 

Una vez agregado el cliente, la aplicación nos redirige al panel principal de clientes, mostrando en la lista a este nuevo cliente.

Si pulsamos el botón de "No añadir", se resetean todos los campos del formulario.

### Actividades
La página realiza un fetch a la base de datos de Strava, utilizando los siguientes parámetros:
1. Id de cliente de Strava
2. Secreto de cliente
3. Refresh token

La API nos retorna un objeto con todas las actividades, las cuales son paginadas completamente tras su carga.

En cada actividad, se muestra un icono dependiendo del tipo de actividad (En este caso, solo en el cliente Javier García Pardo, por ser el único que tener referenciadas tanto las bicicletas utilizadas como las zapatillas).
También se muestra la fecha, la duración y la distancia recorrida.

### Detalle de actividad
Para cada actividad, se muestran en una nueva página los siguientes detalles:
- Duración de la actividad (tiempo en movimiento)
- Media de pulsaciones
- Pulsaciones máximas
- Distancia recorrida
- Desnivel positivo

Además se utiliza la **API de MapBox** para la visualización de la actividad en el mapa decodificando la propiedad "polyline" de la actividad y dibujándola en el mapa.

Si pulsamos "atras", el navegador nos redirigirá al panel de actividades.

### Errores
Cada vez que un Try/Catch no se complete, se generará una nueva página de "error", donde nos mostrará el código del error y un mensaje.
  
### Cerrar sesión
Se destruye la sesión y se redirige al usuario a la página de login.

# Autor
Javier García Pardo, *para la asignatura de Desarrollo de aplicaciones en entorno cliente.*

