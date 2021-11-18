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

function executeOperandClick(clickedOperand, clickedOperandTextContent) {
    if (operationComplete) {
        if (!operator) {
            reset();
        } else {
            operationComplete = false;
        }
    }
    if (clickedOperand === 'point') {
        if (pointExists) {
            return;
        } else {
            pointExists = true;
        }
    }
    if (currentNumber.textContent === '0' && clickedOperandTextContent != '.') {
        currentNumber.textContent = clickedOperandTextContent;
    } else {
        currentNumber.textContent += clickedOperandTextContent;
    }
}

function executeOperatorClick(clickedOperator, clickedOperatorTextContent) {
    if (!operator) {
        if (clickedOperator === 'equals') {
            return;
        } else {
            operator = clickedOperatorTextContent;
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
            operator = clickedOperatorTextContent;
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

function executeOtherOperation(otherOperationClass) {
    if (otherOperationClass === 'clear') {
        reset();
    } else if (otherOperationClass === 'sign') {
        let aux = Number(currentNumber.textContent);
        aux = -aux;
        currentNumber.textContent = aux;
    } else if (otherOperationClass === 'percent') {
        let aux = Number(currentNumber.textContent);
        aux /= 100;
        currentNumber.textContent = aux;
    }
}

function executeBackspace() {
    if (currentNumber.textContent.length === 1) {
        currentNumber.textContent = '0';
    } else {
        if (currentNumber.textContent.charAt(currentNumber.textContent.length - 1) === '.') {
            pointExists = false;
        }
        currentNumber.textContent = currentNumber.textContent.slice(0, currentNumber.textContent.length - 1);
    }
}

function changeButton(className) {
    const btn = document.querySelector('.' + className);
    btn.classList.add('selected-button');
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('transitionend', () => button.classList.remove('selected-button')));

operands.forEach(operand => operand.addEventListener('click', () => {
    executeOperandClick(operand.classList[0], operand.textContent);
    changeButton(operand.classList[0]);
}));
operators.forEach(operator => operator.addEventListener('click', () => {
    executeOperatorClick(operator.classList[0], operator.textContent)
    changeButton(operator.classList[0]);
}));
others.forEach(other => other.addEventListener('click', () => {
    executeOtherOperation(other.classList[0]);
    changeButton(other.classList[0]);
}));

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'Backspace':
            executeBackspace();
            break;
        case '1':
            executeOperandClick('one', '1');
            changeButton('one');
            break;
        case '2':
            executeOperandClick('two', '2');
            changeButton('two');
            break;
        case '3':
            executeOperandClick('three', '3');
            changeButton('three');
            break;
        case '4':
            executeOperandClick('four', '4');
            changeButton('four');
            break;
        case '5':
            executeOperandClick('five', '5');
            changeButton('five');
            break;
        case '6':
            executeOperandClick('six', '6');
            changeButton('six');
            break;
        case '7':
            executeOperandClick('seven', '7');
            changeButton('seven');
            break;
        case '8':
            executeOperandClick('eight', '8');
            changeButton('eight');
            break;
        case '9':
            executeOperandClick('nine', '9');
            changeButton('nine');
            break;
        case '0':
            executeOperandClick('zero', '0');
            changeButton('zero');
            break;
        case '/':
            executeOperatorClick('divide', '/');
            changeButton('divide');
            break;
        case '*':
            executeOperatorClick('multiply', '*');
            changeButton('multiply');
            break;
        case '-':
            executeOperatorClick('subtract', '-');
            changeButton('subtract');
            break;
        case '+':
            executeOperatorClick('add', '+');
            changeButton('add');
            break;
        case '=':
            executeOperatorClick('equals', '=');
            changeButton('equals');
            break;
        case 'Escape':
            executeOtherOperation('clear');
            changeButton('clear');
            break;
        case '~':
            executeOtherOperation('sign');
            changeButton('sign');
            break;
        case '%':
            executeOtherOperation('percent');
            changeButton('percent');
            break;
    }
});