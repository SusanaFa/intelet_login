const d = document;

export function showResult(message) {
    const resultElement = d.getElementById('result');
    resultElement.textContent = message;
}

export function validarRut(rut) {
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

export function appendDeudaRow(deudaList, deuda) {
    const row = d.createElement('tr');

    const descripcionCell = d.createElement('td');
    descripcionCell.textContent = deuda.descripcion;
    row.appendChild(descripcionCell);

    const fechaCell = d.createElement('td');
    fechaCell.textContent = deuda.fecha;
    row.appendChild(fechaCell);

    const cuentaCell = d.createElement('td');
    cuentaCell.textContent = deuda.n_cuenta;
    row.appendChild(cuentaCell);

    const montoCell = d.createElement('td');
    montoCell.classList.add('monto');
    montoCell.textContent = deuda.monto;
    row.appendChild(montoCell);

    const cuotaCell = d.createElement('td');
    cuotaCell.textContent = deuda.n_cuota;
    row.appendChild(cuotaCell);

    const checkboxCell = d.createElement('td');
    const checkbox = d.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('pay-checkbox');
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    deudaList.appendChild(row);
}

export function setupCheckboxes(pagarBtn) {
    const totalElement = d.getElementById('total');
    let total = 0;

    d.querySelectorAll('.pay-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const row = this.closest('tr');
            const monto = parseFloat(row.querySelector('.monto').textContent);

            total += this.checked ? monto : -monto;
            totalElement.textContent = total.toFixed(2);
            pagarBtn.disabled = d.querySelectorAll('.pay-checkbox:checked').length === 0;
        });
    });
}
