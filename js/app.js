const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const others = document.querySelectorAll('.other');
const screen = document.querySelector('.screen');
const fullOperation = document.querySelector('.full-operation');
const currentNumber = screen.querySelector('.current-number'); 

let pointExists = false;
let firstOperand = 0;
let operator = undefined;
let operationComplete = false;

function executeOperandClick() {
    if (operationComplete) {
        if (!operator) {
            reset();
        } else {
            operationComplete = false;
        }
    }
    if (this.classList[0] === 'point') {
        if (pointExists) {
            return;
        } else {
            pointExists = true;
        }
    }
    if (currentNumber.textContent === '0' && this.textContent != '.') {
        currentNumber.textContent = this.textContent;
    } else {
        currentNumber.textContent += this.textContent;
    }
}

function executeOperatorClick() {
    let clickedOperator = this.classList[0];

    if (!operator) {
        if (clickedOperator === 'equals') {
            return;
        } else {
            operator = this.textContent;
            firstOperand = Number(currentNumber.textContent);
            fullOperation.textContent = `${firstOperand} ${operator}`;
            currentNumber.textContent = '0';
            pointExists  = false;
        }
    } else {
        let result = executeOperation(firstOperand, Number(currentNumber.textContent), operator);
        if (clickedOperator === 'equals') {
            fullOperation.textContent = `${firstOperand} ${operator} ${currentNumber.textContent} =`;
            currentNumber.textContent = result;
            operationComplete = true;
            operator = undefined;
        } else {
            operator = this.textContent;
            fullOperation.textContent = `${result} ${operator}`;
            currentNumber.textContent = '0';
            pointExists  = false;
        }
        firstOperand = result;
    }
}

function executeOperation(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 'ERROR!';
    }
}

function reset() {
    currentNumber.textContent = '0';
    fullOperation.textContent = '';
    firstOperand = 0;
    operator = undefined;
    pointExists = false;
    operationComplete = false;
}

function executeOtherOperation() {
    let buttonClass = this.classList[0];
    if (buttonClass === 'clear') {
        reset();
    } else if (buttonClass === 'sign') {
        let aux = Number(currentNumber.textContent);
        aux = -aux;
        currentNumber.textContent = aux;
    } else if (buttonClass === 'percent') {
        let aux = Number(currentNumber.textContent);
        aux /= 100;
        currentNumber.textContent = aux;
    }
}

operands.forEach(operand => operand.addEventListener('click', executeOperandClick));
operators.forEach(operator => operator.addEventListener('click', executeOperatorClick));
others.forEach(other => other.addEventListener('click', executeOtherOperation));
