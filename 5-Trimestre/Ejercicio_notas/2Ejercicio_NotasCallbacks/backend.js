/*
// Funcionamiento de los callbacks

funcion1()
function funcion1 () {
    alert ("1")
    funcion2(funcion3)
}

function funcion2 (funcion3) {
    funcion3()
    alert("3")
}

function funcion3 () {
    alert ("2")
}
*/

let boton_calcular = document.getElementById("b_calcular")

function nota_usuario(nota_1, nota_2, nota_3, callback) {
    let notas = [nota_1,nota_2,nota_3]
    let promedio_nota = calcular_promedio(notas)
    callback(promedio_nota) 
}


function calcular_promedio(promedio_nota) {
    let resultado_promedio = 0
    promedio_nota.forEach((nota) => (resultado_promedio += nota));
    resultado_promedio = resultado_promedio / promedio_nota.length;
    return resultado_promedio
}

function mostrar_nota(promedio_nota) {
    let nombre_aprendiz = String(document.getElementById("campo_nombre").value)
    let numero_identificacion = document.getElementById("campo_identificacion").value
    console.log(`El nombre del usuario es: ${nombre_aprendiz}`)
    console.log(`El numero del usuario es: ${numero_identificacion}`)
    console.log(`Nota final es de: ${promedio_nota}`)
}  

function ProcesoNota(callback) {
    let nota_1 = parseFloat(document.getElementById("campo_nota1").value)
    let nota_2 = parseFloat(document.getElementById("campo_nota2").value)
    let nota_3 = parseFloat(document.getElementById("campo_nota3").value)
    // console.log(nota_1,nota_2,nota_3)
    nota_usuario(nota_1, nota_2, nota_3,callback)
}


function aviso_usuario(promedio_nota ) {
    console.log("Espere...")
    setTimeout(() => {
        mostrar_nota(promedio_nota)

    }, 4000);
}



