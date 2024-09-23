// probando.js
// probando pasar una img desde filtradoClientes a listadoDeudas

export function loadImageFromUrl(param) {
    const urlParams = new URLSearchParams(window.location.search);
    const imgName = urlParams.get(param);
    
    if (imgName) {
        const imgElement = document.createElement('img');
        imgElement.src = `./assets/img/${imgName}`;
        imgElement.alt = imgName;
        imgElement.classList.add('img-fluid'); 
        
        const container = document.getElementById('image-container'); 
            container.appendChild(imgElement);
        }
    }
