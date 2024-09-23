//api.js

import { appendDeudaRow, setupCheckboxes, showResult } from "./utils.js";

// const d = document;

//conexión a la api
export async function fetchDeudas(debtsList, payBtn) {
  try {
    const response = await fetch("http://localhost:3000/deudas");
    if (!response.ok) {
      throw new Error("Error en la respuesta de la red");
    }
    const debts = await response.json();
    debts.forEach((debt) => {
      appendDeudaRow(debtsList, debt);
    });
    setupCheckboxes(payBtn);
  } catch (error) {
    console.error("Error fetching deudas:", error);
    showResult(
      "No se pudieron cargar las deudas. Intente nuevamente más tarde.",
      "result-debts"
    );
  }
}
