/*Constantes del ingreso y envio de la conjetura*/ 
const conjetura = document.querySelector('.conjetura');
const btnEnviar = document.querySelector('.btnEnviar');

/*Constantes para la manipulacion dinamica de los parrafos de salida*/
const parrafosDeSalida = document.querySelector('.parrafosDeSalida');
const turnosRestantes = document.querySelector('.turnosRestantes');
const turnosAnteriores = document.querySelector('.turnosAnteriores');
const resultado = document.querySelector('.resultado');
const ayudas = document.querySelector('.ayudas');

/*Contadores para llevar la cuenta de los turnos y los turnos restantes*/
contador = 1;
contadorTurnos = 10;

/*Boton de reinicio del juego*/
const btnReinicio = document.createElement('button');
btnReinicio.classList.add('btnReinicio');

/*Creación del numero aleatorio*/
let numeroRandon = Math.floor(Math.random() * 100) + 1;

/*Escuchador de eventos para el btnEnviar */
btnEnviar.addEventListener('click', jugar)

/*Funcion logica para la jugabilidad*/
function jugar() {
    turnoUsuario = Number(conjetura.value)
    if (contador === 1) {
        turnosAnteriores.textContent = `Intentos anteriores: `;
        turnosRestantes.textContent = `Te quedan ${contadorTurnos} turnos.`;
    }
    turnosAnteriores.textContent = `${turnosAnteriores.textContent} ${turnoUsuario}`;
    turnosRestantes.textContent = `Te quedan ${(contadorTurnos -= 1)} turnos.`;
    if (turnoUsuario === numeroRandon) {
        resultado.textContent = `¡¡Felicidades has adivinado el número y te quedaron ${contadorTurnos} turnos!! `;
        resultado.style.backgroundColor = 'green';
        juegoTerminado();
    }else if(contador === 10){
        resultado.textContent = `¡¡Lo siento. Has acabado todos los turnos. Juega de nuevo e intenta ganar esta vez!! `;
        resultado.style.backgroundColor = 'red';
        juegoTerminado();
    }else{
        resultado.textContent = `¡¡Respuesta equivocada. Intenta de nuevo!! `;
        resultado.style.backgroundColor = 'red';
    }if (turnoUsuario < numeroRandon) {
        ayudas.textContent = 'El numero ingresado es menor que el numero a adivinar.';
    }else if (turnoUsuario > numeroRandon) {
        ayudas.textContent = 'El numero ingresado es superior al numero a adivinar.';        
    }

    contador++;
    conjetura.value = '';
    conjetura.focus();
}

/*Funcion juego terminado*/
function juegoTerminado() {
    conjetura.disabled = true;
    btnEnviar.disabled = true;

    ayudas.textContent = '';

    btnReinicio.textContent = 'Volver a jugar.';
    parrafosDeSalida.appendChild(btnReinicio);
    btnReinicio.addEventListener('click', reiniciarJuego);
}

/*Funcion para reiniciar el juego*/
function reiniciarJuego() {
    conjetura.disabled = false;
    btnEnviar.disabled = false;

    const parrafosDeSalida = document.querySelectorAll('.parrafosDeSalida p')

    for (const parrafo of parrafosDeSalida) {
        parrafo.textContent = '';
    }

    resultado.style.backgroundColor = '';

    btnReinicio.parentNode.removeChild(btnReinicio);

    contador = 1;
    contadorTurnos = 10;

    conjetura.value = '';
    conjetura.focus();
}