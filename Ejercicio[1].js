const contenedor = document.querySelector(".Contenedor_notas");
const cajas = prompt("Cuantos inputs quieres?");
const identificadores = [];
const numeros_usuario = [];
let notas_con_porcentaje = [];

for (let i=1; i<=cajas; i++) {
    const texto = document.createElement("input");
    texto.type = "number"
    contenedor.appendChild(texto)
    texto.placeholder=`Nota ${i}`
    let identificador = texto.id=`Nota${i}`
    if (i>=cajas) {
        const texto = document.createElement("input");
        texto.type = "button"
        texto.value = "Calcular"
        texto.id = "Boton_1"
        contenedor.appendChild(texto)
    } 
    identificadores.push(identificador) 
}

const boton2 = document.getElementById("Boton_1")

boton2.addEventListener("click",()=> {
    valor_notas()
    function valor_notas() {
        numeros_usuario.splice(0,numeros_usuario.length)
        for (i=1; i<=cajas; i++) {
            let valores = document.getElementById(`Nota${i}`);
            let valor = parseFloat((valores.value))
            numeros_usuario.push(valor)
        }
        console.log('Notas registradas por el usuario:',numeros_usuario)
        proceso_notas(porcentaje_notas)
    }
    
})

function proceso_notas (porcentaje_notas) {
    let total_suma = 0;
    let promedio_notas = 0;
    numeros_usuario.forEach(x => {
        total_suma = total_suma+x;
        promedio_notas = total_suma/numeros_usuario.length;
    
    });
    console.log(`Suma de notas: ${total_suma}`)
    console.log(`Promedio de notas: ${promedio_notas}`)
    porcentaje_notas()
}

function porcentaje_notas () {
    numeros_usuario.forEach(s => {
        let porcentaje = (s*30)/100;
        notas_con_porcentaje.push(porcentaje);
    })
    console.table("El total del porcentaje de cada nota es:", notas_con_porcentaje)
    notas_con_porcentaje.splice(0,notas_con_porcentaje.length)
    console.log("------------------------------------"); 
}