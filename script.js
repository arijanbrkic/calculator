const calcDisplay = document.getElementById("calculator-display");
calcDisplay.textContent = "0";
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operators-buttons');
let firstOperand = null;
let currentOperator = null;
let secondOperand = null;

// operations
const add = function(a, b){
    return a + b;
}

const subtract = function(a, b){
    return a - b;
}

const multiply = function(a, b){
    return a * b;
}

const divide = function(a, b){
    if (b != 0){
    return a / b;
    } else {
        return "You suck";
    }
}


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        if (calcDisplay.textContent === "0") {
            calcDisplay.textContent = value; 
        } else {
            calcDisplay.textContent += value; // Append new value
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        firstOperand = parseFloat(calcDisplay.textContent);
        console.log(firstOperand);
        const value = button.value;
        calcDisplay.textContent = value; 
        
    });
});