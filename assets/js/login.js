//login.js

import { showResult, hideResult} from './utils.js';
import { validarRut } from './validation.js';

const d = document;

export function handleLoginSubmit(e) {
    e.preventDefault();
    const rutInput = d.getElementById('rut');

    rutInput.addEventListener('input', formatRut);
    
    const rutValue = rutInput.value;

    // Validar el formato del RUT. incluir en login clientes
   try {
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
    if (!rutRegex.test(rutValue)) {
        showResult("Formato de RUT inválido", 'result-login');
        return;
    }

    // Validar el RUT
    if (validarRut(rutValue)) {
        hideResult('result-login')
        // showResult("RUT válido", 'result-login');
        window.location.href = "listadoDeudas.html";
    } else {
        showResult('RUT inválido', 'result-login');
    }
} catch (error) {
    console.error('Error en la validación del rut: ', error);
    showResult("ocurrió un error al validar el RUT. intente nuevamente.", 'result- login');
    

}
   } 

// Formatear el RUT en tiempo real
function formatRut(e) {
    let value = e.target.value;

    // Eliminar caracteres no numéricos, excepto K/k
    value = value.replace(/[^0-9Kk]/g, '');

    // Formatear el RUT con puntos y guión
    if (value.length > 2) {
        value = value.replace(/^(\d{1,2})(\d{3})/, '$1.$2'); // Primer punto
    }
    if (value.length > 6) {
        value = value.replace(/^(\d{1,2})\.(\d{3})(\d{3})/, '$1.$2.$3'); // Segundo punto
    }
    if (value.length > 9) {
        value = value.replace(/^(\d{1,2})\.(\d{3})\.(\d{3})([0-9Kk])/, '$1.$2.$3-$4'); // Guión antes del DV
    }

    e.target.value = value;
}
