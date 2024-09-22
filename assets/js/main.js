//main.js

import { handleLoginSubmit } from './login.js';
import { fetchDeudas } from './deudas.js';
import { showResult } from './utils.js';

const d = document;

d.addEventListener("DOMContentLoaded", function () {
    const loginForm = d.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    const deudaList = d.getElementById("deudas-list");
    const pagarBtn = d.getElementById("pagar-btn");

    if (deudaList) {
        try{
            fetchDeudas(deudaList, pagarBtn);
        } catch(error){
            console.error('Error en la carga de deudas: ', error);
            showResult("Error al cargar deudas. Intente nuevamente mas tarde. ");

            
        }


        }
       
});
