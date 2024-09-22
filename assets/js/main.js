import { handleLoginSubmit } from './login.js';
import { fetchDeudas } from './deudas.js';

const d = document;

d.addEventListener("DOMContentLoaded", function () {
    const loginForm = d.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    const deudaList = d.getElementById("deudas-list");
    const pagarBtn = d.getElementById("pagar-btn");

    if (deudaList) {
        fetchDeudas(deudaList, pagarBtn);
    }
});
