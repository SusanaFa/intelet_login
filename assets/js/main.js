//main.js

import { handleLoginSubmit } from "./login.js";
import { fetchDeudas } from "./api.js";
import { showResult, hideResult } from "./utils.js";
// import { validarRut } from './validation.js'; aun sin uso.

const d = document;

d.addEventListener("DOMContentLoaded", function () {
 
    //pagina login -- revisar
    const loginForm = d.getElementById("login");
  
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  //pagina deudas -- funcionando
  const debtsList = d.getElementById("debts-list");
  const payBtn = d.getElementById("pay-btn");

  if (debtsList) {
    try {
      fetchDeudas(debtsList, payBtn);
      hideResult("result-debts");
    } catch (error) {
      console.error("Error en la carga de deudas: ", error);
      showResult(
        "Error al cargar deudas. Intente nuevamente más tarde.",
        "result-debts"
      );
    }
  }

    //otras páginas por manejar

});
