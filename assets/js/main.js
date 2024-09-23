//main.js

import { handleLoginSubmit } from './login.js';
import { fetchDeudas } from './api.js';
import { showResult , hideResult } from './utils.js';
// import { validarRut } from './validation.js'; aun sin uso.

const d = document;

d.addEventListener("DOMContentLoaded", function () {
    const loginForm = d.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    const deudaList = d.getElementById('deudas-list');
    const pagarBtn = d.getElementById('pagar-btn');
    

    if (deudaList) {
        try{
            fetchDeudas(deudaList, pagarBtn);
            hideResult('result-debts');
          
            
            
        } catch(error){
            console.error('Error en la carga de deudas: ', error);
            showResult('Error al cargar deudas. Intente nuevamente más tarde.', 'result-debts');
           
            

            
        }


        }
       
});
