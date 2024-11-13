const currentOperationDisplay = document.getElementById("current-operation");
const previousOperationDisplay = document.getElementById("previous-operation");
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operators-buttons');
const equalsButton = document.getElementById('equals-button');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let previousOperation = '';
let currentOperation = '';

let isMaxDigits = false; // Max digits a user can use per operand is 10


// Calculator logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b; 

function handleNumberButtons() {
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            // If user adds more than 10 digits, this exits the function
            if (calcDisplay.textContent.length >= 10) {
                isMaxDigits = true;
            }
            if(isMaxDigits){
                console.log("Goodbye");
                return;
            }
            // User can not add more than one decimal point
            if (button.value === '.' && calcDisplay.textContent.includes('.')) {
                return;
            }
    
            if (calcDisplay.textContent === "0" || calcDisplay.textContent === currentOperator) {
                calcDisplay.textContent = button.value; 
            } else {
                calcDisplay.textContent += button.value; // Append new value
            }
        });
    });
}
