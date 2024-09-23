//utils.js

const d = document;

// Función que muestra los div con mensajes de error 
export function showResult(message, id) {
  console.log("mostrando el error ", message);
  console.log("ID pasado a la función showResult", id);

  const resultElement = d.getElementById(id);

  if (resultElement) {
    resultElement.style.display = "block";
    resultElement.textContent = message;
    console.log("mostrando el div con ID: ", id);
  } else {
    console.error("No se encontró el elemento con ID:", id);
  }
}

// Función que oculta el div que contiene los errores
export function hideResult(id) {
  const resultElement = d.getElementById(id);
  if (resultElement) {
    resultElement.style.display = "none";
    console.log("ocultando el div con ID: ", id);
  } else {
    console.error("No se encontró el elemento con ID: ", id);
  }
}
// función que se encarga de crear la tabla de deudas
export function appendDeudaRow(deudaList, deuda) {
  const row = d.createElement("tr");

  const descripcionCell = d.createElement("td");
  descripcionCell.textContent = deuda.descripcion;
  row.appendChild(descripcionCell);

  const fechaCell = d.createElement("td");
  fechaCell.textContent = deuda.fecha;
  row.appendChild(fechaCell);

  const cuentaCell = d.createElement("td");
  cuentaCell.textContent = deuda.n_cuenta;
  row.appendChild(cuentaCell);

  const montoCell = d.createElement("td");
  montoCell.classList.add("monto");
  montoCell.textContent = deuda.monto;
  row.appendChild(montoCell);

  const cuotaCell = d.createElement("td");
  cuotaCell.textContent = deuda.n_cuota;
  row.appendChild(cuotaCell);

  const checkboxCell = d.createElement("td");
  const checkbox = d.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("pay-checkbox");
  checkboxCell.appendChild(checkbox);
  row.appendChild(checkboxCell);

  deudaList.appendChild(row);
}

// Función que en base a los checkbox seleccionados suma los valores de las deudas 
//y habilita o deshabilita el boton de pago dependiendo del caso
export function setupCheckboxes(pagarBtn) {
  const totalElement = d.getElementById("total");
  let total = 0;

  d.querySelectorAll(".pay-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const row = this.closest("tr");
      const monto = parseFloat(row.querySelector(".monto").textContent);

      total += this.checked ? monto : -monto;
      totalElement.textContent = Math.floor(total).toString();
      pagarBtn.disabled =
        d.querySelectorAll(".pay-checkbox:checked").length === 0;
    });
  });
}
