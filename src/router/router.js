import _ from "lodash";
import { Login } from "../components/Login.js";
import { SignOut } from "../components/SignOut.js";
import { TestPage } from "../components/TestPage.js";
import { Activities_controller } from "../controller/Activities_controller.js";
import { ActivityDetails_controller } from "../controller/ActivityDetails_controller.js";
import { CustomerData_controller } from "../controller/CustomerData_controller.js";
import { Customers_controller } from "../controller/Customers_controller.js";
import { FrontPage_controller } from "../controller/FrontPage_controller.js";
import { NewCustomer_controller } from "../controller/NewCustomer_controller.js";

export { router }

function router(route) {
    //LocalStorage
    if (JSON.parse(localStorage.getItem("Token")) === null && route!="#/test") route = "#/login"
    //Funcions fletxa
    let options = {
        "#/login": ()=> new Login(),
        "#/test":()=> new TestPage(),
        "#/principal": ()=> new FrontPage_controller(),
        "#/customers": ()=> new Customers_controller(),
        "#/actividades": ()=> new Activities_controller(),
        "#/nuevocliente": ()=> new NewCustomer_controller().getModel(),
        "#/datoscliente": ()=> new CustomerData_controller(),
        "#/actividad": ()=> new ActivityDetails_controller(JSON.parse(localStorage.getItem("Actividad"))),
        "#/desconectar": ()=> new SignOut(),
    }

    return options[route]();

}