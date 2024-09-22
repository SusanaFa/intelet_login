import { showResult, validarRut } from './utils.js';

const d = document;

export function handleLoginSubmit(e) {
    e.preventDefault();
    const rutInput = d.getElementById('rut');

    rutInput.addEventListener('input', formatRut);
    
    const rutValue = rutInput.value;

    // Validar el formato del RUT
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
    if (!rutRegex.test(rutValue)) {
        showResult("Formato de RUT inválido");
        return;
    }

    // Validar el RUT
    if (validarRut(rutValue)) {
        showResult("RUT válido");
        window.location.href = "listadoDeudas.html";
    } else {
        showResult("RUT inválido");
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
