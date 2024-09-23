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
