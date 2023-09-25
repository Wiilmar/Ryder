const modal = document.getElementById('modal');
const tabla = document.getElementById('tabla');

const abrirModal = document.getElementById('abrirModal');
const cerrarModal = document.getElementById('cerrarModal');

let array = [];

abrirModal.addEventListener('click', () => {
    modal.style.display = 'block';
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

function editar(i) {
    let inputs = [];
    for (let j = 1; j <= 5; j++) {
        let input = document.getElementById(`input${j}_${i}`);
        input.disabled = false;
        inputs.push(input);
    }
    return inputs.map(input => input.value);
}

function guardar(i) {
    return new Promise((resolve) => {
        editar(i).then(nuevoValor => {
            array[i].identificacion = nuevoValor[0];
            array[i].nombre = nuevoValor[1];
            array[i].nota[0] = parseFloat(nuevoValor[2]);
            array[i].nota[1] = parseFloat(nuevoValor[3]);
            array[i].nota[2] = parseFloat(nuevoValor[4]);

            const nuevaDefinitiva = (array[i].nota[0] + array[i].nota[1] + array[i].nota[2]) / 3;
            array[i].definitiva = nuevaDefinitiva;

            nuevoValor.forEach((valor, j) => {
                let input = document.getElementById(`input${j + 1}_${i}`);
                input.value = valor;
                input.disabled = true;
            });

            setTabla();
            resolve();
        });
    });
}

function eliminar(id) {
    array = array.filter(e => e.ideli !== id);
    setTabla();
}

function setTabla() {
    tabla.innerHTML = '';
    let head = document.createElement('thead');
    head.innerHTML = `<th>Identificación</th>
    <th>Nombre</th>
    <th>Nota 1</th>
    <th>Nota 2</th>
    <th>Nota 3</th>
    <th>Nota Definitiva</th>
    <th>Acciones</th>`;
    array.forEach((e, i) => {
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        let guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar';
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        editarBtn.addEventListener('click', () => {
            editar(i).then(() => {
                // Resolver después de la edición
                resolve();
            });
        });
        guardarBtn.addEventListener('click', () => {
            guardar(i).then(() => {
                // Resolver después de guardar
                resolve();
            });
        });

        let fila = document.createElement('tr');
        for (let j = 1; j <= 5; j++) {
            let celda = document.createElement('td');
            celda.innerHTML = `<input type='text' id='input${j}_${i}' value='${e[j]}' disabled>`;
            fila.appendChild(celda);
        }

        let celdaDefinitiva = document.createElement('td');
        celdaDefinitiva.innerHTML = `<input type='number' id='input6_${i}' value='${e.definitiva}' disabled>`;
        fila.appendChild(celdaDefinitiva);

        let celdaAcciones = document.createElement('td');
        celdaAcciones.appendChild(editarBtn);
        celdaAcciones.appendChild(guardarBtn);
        celdaAcciones.appendChild(eliminarBtn);
        fila.appendChild(celdaAcciones);
        head.appendChild(fila);

        eliminarBtn.onclick = () => {
            eliminar(e.ideli);
        };
    });
    tabla.appendChild(head);
}

function calcularPromedio(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

function agregarDatos(nota1, nota2, nota3, identificacion, nombre) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const promedio = calcularPromedio(nota1, nota2, nota3);
            const objeto = {
                ideli: Date.now(),
                identificacion: identificacion,
                nombre: nombre,
                nota: [nota1, nota2, nota3],
                definitiva: promedio,
            };
            array.push(objeto);
            resolve({ jugador: promedio });
        }, 100);
    });
}

const boton = () => {
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);
    const identificacion = document.getElementById("identificacion").value;
    const nombre = document.getElementById("nombre").value;

    agregarDatos(nota1, nota2, nota3, identificacion, nombre).then((user) => {
        setTabla();
    });
};

