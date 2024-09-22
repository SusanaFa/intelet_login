import { appendDeudaRow, setupCheckboxes } from './utils.js';

const d = document;

export function fetchDeudas(deudaList, pagarBtn) {
    fetch('http://localhost:3000/deudas')
        .then(response => response.json())
        .then(deudas => {
            deudas.forEach(deuda => {
                appendDeudaRow(deudaList, deuda);
            });
            setupCheckboxes(pagarBtn);
        })
        .catch(error => console.error('Error fetching deudas:', error));
}
