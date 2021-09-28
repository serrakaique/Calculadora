'use strict';

const display = document.getElementById('display');
/* nao pode chamar pela classe porque todos tem a mesma classe e 
nem pelo container e nem um container separado, entao voce seleciona
o elemento cuja o id*= tecla que seria pegar classes que tenha como
tecla alguma parte do nome */
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
//vai guardar na memoria
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()){
//replace = vai substituir por causa que java so le o . e nao a , na contagem
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
/*const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);ira fazer a mesma coisa do if de baixo
atualizarDisplay(resultado);*/
//colocando os operadores
        if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);   
        }   
    }
}   

const atualizarDisplay = (texto) => {
    if (novoNumero){
//quando nao for um novo numero , ele vai substituir
//ira trocar para a virgula na hora do resultado
        display.textContent = texto.toLocaleString('BR');
//novoNumero = false = para conseguir juntar os numeros
        novoNumero = false;
    }else{
//ira concatenar o que voce clicar se for um novo numero
//ira trocar para a virgula na hora do resultado 
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); /*display.textContent = evento.target.textContent;
 ira mostrar o numero que foi clicado*/

//para cada numero quando for clicado vai para inserirNumero
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

const selecionarOperador = (evento) =>  {
    if(!novoNumero) {
    calcular();
//toda vez que clicar no operador, ele tem que guardar o operador e o numero.
    novoNumero = true;
    operador = evento.target.textContent;
//replace = vai substituir por causa que java so le o . e nao a , na contagem
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
//fica sem valor 
    operador = undefined;
}
document.getElementById('igual').addEventListener('click',ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click',limparDisplay);

const limparCalculo = () => {
    limparDisplay();
//undefined = ele limpar o que esta guardado
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click',limparCalculo);

//ira remover o ultimo numero
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click',removerUltimoNumero);

const inveterSinal = () => {
    novoNumero = true;
//ira troca o sinal de negatico para positivo e vice-versa
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click',inveterSinal);

//procura uma string , no caso se existe a virgula, caso nao tenha vai aparecer -1.
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
//para saber se existe valor
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
//so pode ter uma virgula
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }

    }

}
document.getElementById('decimal').addEventListener('click',inserirDecimal);


const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
//verifica se umas das keys do objeto mapaTeclado tem a tecla pressionado
    const tecladoPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

//ele pega no mapateclado tudo que tenha tecla e aciona o evento click (como se fosse clicar com o mouse)
   if(tecladoPermitida())  document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapaTeclado);