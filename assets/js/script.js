const d = document;

d.addEventListener("DOMContentLoaded", function () {
    const loginForm = d.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const rutInput = d.getElementById('rut');

            rutInput.addEventListener('input', (e) => {
                let value = e.target.value;

                // Eliminar caracteres no numéricos, excepto K/k
                value = value.replace(/[^0-9Kk]/g, '');

                // Formatear el RUT con puntos y guión en tiempo real
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
            });

            const rutValue = rutInput.value;

            // Validar el formato del RUT
            const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
            if (!rutRegex.test(rutValue)) {
                d.getElementById('result').textContent = "Formato de RUT inválido";
                return;
            }

            // Validar el RUT
            if (validarRut(rutValue)) {
                d.getElementById('result').textContent = "RUT válido";
                window.location.href = "listadoDeudas.html";
            } else {
                d.getElementById('result').textContent = "RUT inválido";
            }
        });

        // Función para validar el RUT
        function validarRut(rut) {
            rut = rut.replace(/\./g, '').replace('-', '').trim();
            const cuerpo = rut.slice(0, -1);
            let dv = rut.slice(-1).toUpperCase();

            if (cuerpo.length < 7) {
                return false;
            }

            let suma = 0;
            let multiplo = 2;

            for (let i = cuerpo.length - 1; i >= 0; i--) {
                suma += multiplo * rut.charAt(i);
                multiplo = (multiplo === 7) ? 2 : multiplo + 1;
            }

            const dvEsperado = 11 - (suma % 11);
            let dvCalculado = (dvEsperado === 11) ? '0' : (dvEsperado === 10) ? 'K' : dvEsperado.toString();

            return dv === dvCalculado;
        }
    }

    // Manejar el listado de deudas
    const deudaList = d.getElementById("deudas-list");
    if (deudaList) {
        fetch('http://localhost:3000/deudas')
            .then(response => response.json())
            .then(deudas => {
                deudas.forEach(deuda => {
                    deudaList.innerHTML += `
                        <tr>
                            <td>${deuda.fecha}</td>
                            <td>${deuda.descripcion}</td>
                            <td>${deuda.monto}</td>
                            <td>${deuda.estado}</td>
                            <td><a href="pago.html" class="btn btn-success">Pagar</a></td>
                        </tr>`;
                });
            })
            .catch(error => console.error('Error fetching deudas:', error));
    }
});
