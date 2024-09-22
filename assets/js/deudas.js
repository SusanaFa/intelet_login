//deudas.js 

import { appendDeudaRow, setupCheckboxes, showResult } from './utils.js';

const d = document;

export async function fetchDeudas(deudaList, pagarBtn) {
    try {
        const response = await fetch('http://localhost:3000/deudas');
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        const deudas = await response.json();
        deudas.forEach(deuda => {
            appendDeudaRow(deudaList, deuda);
        });
        setupCheckboxes(pagarBtn);
    } catch (error) {
        console.error('Error fetching deudas:', error);
        showResult("No se pudieron cargar las deudas. Intente nuevamente más tarde.");
    }
}