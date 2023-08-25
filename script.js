// retrieve variable from HTML tree

const numbers = document.querySelectorAll('.keypad > .num');
const actions = document.querySelectorAll('.keypad > .action');
const display = document.querySelector('.display');
const clear = document.querySelector('.keypad > #clr');
const del = document.querySelector('.keypad > #del');
const decimal = document.querySelector('.keypad > #dec');
const result = document.querySelector('.keypad > #result');

// define Operator function variables

let opA = '';
let operator = null;
let opB = '';
let equalAllowed = false;
let operatorAllowed = true;
let side = 'left';

// Click listeners

numbers.forEach(num => num.addEventListener('click', inputNum));
actions.forEach(act => act.addEventListener('click', inputAction));
decimal.addEventListener('click', addDecimal);
clear.addEventListener('click', clearAll);
del.addEventListener('click', delNum);
result.addEventListener('click', showResult);

// Math Functions

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function modulo(a,b) {
    return a % b;
}

// Operate Function

function operate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === "+") {
        return add(a,b);
    }
    else if (operator === "-") {
        return subtract(a,b)
    }
    else if (operator == "*") {
        return multiply(a,b)
    }
    else if (operator === "/") {
        return divide(a,b)
    }
    else if (operator === "%") {
        return modulo(a,b);
    }
}

// Additional Calculator Functions

function clearAll() {
    display.textContent = '';
    opA = '';
    operator = null;
    opB = '';
    side = 'left';
}

function addDecimal() {
    if (side === 'left') {
        if (!opA.includes('.')) {
            display.textContent += '.';
            opA += '.';
        }
    }
    else if (side === 'right') {
        if (!opB.includes('.')) {
            display.textContent += '.';
            opB += '.';
        }
    }
    else return display.textContent
}

function delNum() {
    if (side === 'left') {
        if (opA !== '') {
            let newA = opA.slice(0, -1);
            opA = newA;
            let newDisplay = display.textContent.slice(0, -1);
            display.textContent = newDisplay;
        }
    }

    else if (side === 'right') {
        if (opB !== '') {
            let newB = b.slice(0, -1);
            opB = newB;
            let newDisplay = display.textContent.slice(0, -1);
            display.textContent = newDisplay;
        }
    }
}

function showResult() {
    if (equalAllowed === true) {
        let result = operate(opA, operator, opB);
        display.textContent = result;
        opA = result.toString();
        opB = '';
        operator = null;
        side = 'left';
    }
    equalAllowed = false;
}

function inputAction() {
    if (operatorAllowed == true) {
        if (side === 'left') {
            display.textContent += this.textContent;
            operator = this.textContent;
            side = 'right';
        }

        else {
            let op = operate(opA, operator, opB);
            display.textContent = `${op} ${this.textContent}`;
            opA = op.toString();
            operator = this.textContent;
            opB = '';
        }
    }
    operatorAllowed = false;
}

function inputNum() {
    display.textContent += this.textContent;
    operatorAllowed = true;
    
    if (side === 'left') {
        opA += this.textContent;
    }
    else {
        opB += this.textContent;
        equalAllowed = true;
    }
}