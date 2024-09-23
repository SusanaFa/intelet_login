//login.js

import { showResult, hideResult } from "./utils.js";
import { validarRut, formatRut } from "./validation.js";

const d = document;

// Función que en base a los datos ingresado en el input "rut" ejecuta
//la función de validar rut y muestra los errores en caso de que haya algún error
//debo revisarla, eliminé esta página de login
export function handleLoginSubmit(e) {
  e.preventDefault();
  const rutInput = d.getElementById("rut");

  rutInput.addEventListener("input", formatRut);

  const rutValue = rutInput.value;

  // Validar el formato del RUT. incluir en login clientes
  try {
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
    if (!rutRegex.test(rutValue)) {
      showResult("Formato de RUT inválido", "result-login");
      return;
    }

    // Validar el RUT
    if (validarRut(rutValue)) {
      hideResult("result-login");
      // showResult("RUT válido", 'result-login');
      window.location.href = "listadoDeudas.html";
    } else {
      showResult("RUT inválido", "result-login");
    }
  } catch (error) {
    console.error("Error en la validación del rut: ", error);
    showResult(
      "ocurrió un error al validar el RUT. intente nuevamente.",
      "result- login"
    );
  }
}

