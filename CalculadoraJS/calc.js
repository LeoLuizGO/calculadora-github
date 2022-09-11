'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=btnNum]');
const operators = document.querySelectorAll('[id*=btnOp]');

const equal = document.getElementById('btnEqual');
const c = document.getElementById('btnC');
const del = document.getElementById('btnDelete');
const inv = document.getElementById('btnInv');
const dot = document.getElementById('btnDot');

let newNum = true;
let op;
let prevNum;

const currentOp = () => op != undefined; 

const calc = () => {
    if (currentOp()){
        const currentNum = parseFloat(display.textContent);
        newNum = true
        switch (op) {
            case '+':
                displayUpdate(prevNum + currentNum)
                break
            case '-':
                displayUpdate(prevNum - currentNum)
                break
            case '÷':
                displayUpdate(prevNum/currentNum)
                break
            case '×':
                displayUpdate(prevNum * currentNum)
                break
            /* case '+/-':
                display.textContent = (parseFloat(display.textContent) * -1)
                break */
                
        }
    } 
}

const displayUpdate = (text) => {
    //console.log(text.toFixed())
    text = text.toString().substr(0, 10);
    if (newNum) {
        display.textContent = text;
        newNum = false;
    } else {
        display.textContent += text;
    }
}

const insertNum = (evento) => displayUpdate(evento.target.textContent);

//display.textContent = event.target.textContent;  
//console.log(numbers);

numbers.forEach(number => number.addEventListener('click', insertNum));

const operatorSelect = (evento) => {
    if (!newNum) {
        calc();
        newNum = true; // operador nao aparece 
        op = evento.target.textContent;
        prevNum = parseFloat(display.textContent);
        console.log(op);
    }
}
operators.forEach(op => op.addEventListener('click', operatorSelect));

// console.log(operators);
// Botao Igual
const equalCalc = () => {
    calc();
    op = undefined;
    // console.log("igual foi clicado")
}
// equal.addEventListener('click', equalCalc())
equal.addEventListener('click', equalCalc);

// Botao Limpar
const clearall = () => {
    op = undefined;
    prevNum = undefined;
    newNum = true;
    displayUpdate('');
    // console.log('limpando');
}
c.addEventListener('click', clearall);

// Botao Delete
const deleteNum = () => {
    console.log(display.textContent.slice(0, ((display.textContent).length - 1)))
    display.textContent = display.textContent.slice(0, ((display.textContent).length - 1))
    if (display.textContent === '-') {
        display.textContent = '';
    }
    if (display.textContent === ''){
        newNum = true;
    }
}
del.addEventListener('click', deleteNum);

//Botao inverter
const invNum = () => {
    if (display.textContent != '') {
        display.textContent = (parseFloat(display.textContent) * -1);
    }
}
inv.addEventListener('click', invNum);

//Botao ponto
const dotNum = () => {
    if (display.textContent.indexOf('.') === -1) {
        display.textContent = (parseFloat(display.textContent)+'.')
    }
    //console.log(display.textContent = (parseFloat(display.textContent)+'.'))
}
dot.addEventListener('click', dotNum)