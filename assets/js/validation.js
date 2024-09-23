// validation.js

//función que valida que el rut sea el correcto en chile
export function validarRut(rut) {
  rut = rut.replace(/\./g, "").replace("-", "").trim();
  const cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();

  if (cuerpo.length < 7) {
    return false;
  }

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * rut.charAt(i);
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalculado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalculado;
}

// Formatear el RUT en tiempo real
//aun debo probarlo. la vez anterior no resultó muy bien
export function formatRut(e) {
  let value = e.target.value;

  // Eliminar caracteres no numéricos, excepto K/k
  value = value.replace(/[^0-9Kk]/g, "");

  // Formatear el RUT con puntos y guión
  if (value.length > 2) {
    value = value.replace(/^(\d{1,2})(\d{3})/, "$1.$2"); // Primer punto
  }
  if (value.length > 6) {
    value = value.replace(/^(\d{1,2})\.(\d{3})(\d{3})/, "$1.$2.$3"); // Segundo punto
  }
  if (value.length > 9) {
    value = value.replace(
      /^(\d{1,2})\.(\d{3})\.(\d{3})([0-9Kk])/,
      "$1.$2.$3-$4"
    ); // Guión antes del DV
  }

  e.target.value = value;
}
