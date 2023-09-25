const tablaBody = document.getElementById("tabla-body");
const identificacionInput = document.getElementById("identificacion");
const nombreInput = document.getElementById("nombre");
const nota1Input = document.getElementById("nota1");
const nota2Input = document.getElementById("nota2");
const nota3Input = document.getElementById("nota3");
const agregarBtn = document.getElementById("agregar");

let datos = []; 
function calcularDefinitiva(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

function crearFila(data) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${data.identificacion}</td>
        <td>${data.nombre}</td>
        <td>${data.nota1}</td>
        <td>${data.nota2}</td>
        <td>${data.nota3}</td>
        <td>${data.definitiva.toFixed(2)}</td>
        <td>
            <button onclick="editar(${data.id})">Editar</button>
            <button onclick="eliminar(${data.id})">Eliminar</button>
            <button onclick="guardar(${data.id})" style="display: none;">Guardar</button>
        </td>
    `;
    fila.dataset.id = data.id;
    tablaBody.appendChild(fila);
}

function agregarDatos() {
    const identificacion = identificacionInput.value.trim();
    const nombre = nombreInput.value.trim();
    const nota1 = parseFloat(nota1Input.value);
    const nota2 = parseFloat(nota2Input.value);
    const nota3 = parseFloat(nota3Input.value);

    if (!identificacion || !nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    const id = Date.now();
    const definitiva = calcularDefinitiva(nota1, nota2, nota3);

    const nuevoDato = { id, identificacion, nombre, nota1, nota2, nota3, definitiva };
    datos.push(nuevoDato);
    crearFila(nuevoDato);

    identificacionInput.value = "";
    nombreInput.value = "";
    nota1Input.value = "";
    nota2Input.value = "";
    nota3Input.value = "";
}

function editar(id) {
    const fila = document.querySelector(`[data-id="${id}"]`);
    const botones = fila.querySelectorAll("button");
    const tds = fila.querySelectorAll("td");

    tds[0].innerHTML = `<input type="number" value="${tds[0].textContent}" id="edit-identificacion-${id}">`;
    tds[1].innerHTML = `<input type="text" value="${tds[1].textContent}" id="edit-nombre-${id}">`;
    tds[2].innerHTML = `<input type="number" value="${tds[2].textContent}" id="edit-nota1-${id}">`;
    tds[3].innerHTML = `<input type="number" value="${tds[3].textContent}" id="edit-nota2-${id}">`;
    tds[4].innerHTML = `<input type="number" value="${tds[4].textContent}" id="edit-nota3-${id}">`;

    botones[0].style.display = "none";
    botones[1].style.display = "none";
    botones[2].style.display = "block";
}

function guardar(id) {
    const fila = document.querySelector(`[data-id="${id}"]`);
    const botones = fila.querySelectorAll("button");
    const tds = fila.querySelectorAll("td");

    const editIdentificacion = document.getElementById(`edit-identificacion-${id}`);
    const editNombre = document.getElementById(`edit-nombre-${id}`);
    const editNota1 = document.getElementById(`edit-nota1-${id}`);
    const editNota2 = document.getElementById(`edit-nota2-${id}`);
    const editNota3 = document.getElementById(`edit-nota3-${id}`);

    const identificacion = editIdentificacion.value;
    const nombre = editNombre.value;
    const nota1 = parseFloat(editNota1.value);
    const nota2 = parseFloat(editNota2.value);
    const nota3 = parseFloat(editNota3.value);
    const definitiva = calcularDefinitiva(nota1, nota2, nota3);

    datos = datos.map((dato) => {
        if (dato.id === id) {
            dato.identificacion = identificacion;
            dato.nombre = nombre;
            dato.nota1 = nota1;
            dato.nota2 = nota2;
            dato.nota3 = nota3;
            dato.definitiva = definitiva;
        }
        return dato;
    });

    tds[0].textContent = identificacion;
    tds[1].textContent = nombre;
    tds[2].textContent = nota1;
    tds[3].textContent = nota2;
    tds[4].textContent = nota3;
    tds[5].textContent = definitiva.toFixed(2);

    botones[0].style.display = "block";
    botones[1].style.display = "block";
    botones[2].style.display = "none";
}

function eliminar(id) {
    datos = datos.filter((dato) => dato.id !== id);
    const fila = document.querySelector(`[data-id="${id}"]`);
    fila.remove();
}

agregarBtn.addEventListener("click", agregarDatos);
