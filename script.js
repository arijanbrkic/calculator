const calcDisplay = document.getElementById("calculator-display");
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operators-buttons');
const equalsButton = document.getElementById('equals-button');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
calcDisplay.textContent = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let isMaxDigits = false; // Max digits a user can use per operand is 10

// Calculator logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b; 

// Logic to get values for the first operand
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
// Logic to get the operator
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(firstOperand === null){
            firstOperand = parseFloat(calcDisplay.textContent);
   
        } else if(currentOperator && calcDisplay.textContent !== ''){
            secondOperand = parseFloat(calcDisplay.textContent);
        }
        currentOperator = button.value;
        calcDisplay.textContent = currentOperator;
        console.log( firstOperand + currentOperator + secondOperand);
    });
});
// Equals button logic to perform operation
equalsButton.addEventListener('click', () => {
// If there is no first operand, no calculation will be made    
    if (firstOperand === null || currentOperator === null || isNaN(firstOperand)){
        console.log("You need a first operand");
        if(!isNaN(calcDisplay.textContent)){
            firstOperand = parseFloat(calcDisplay.textContent);
        }
        return;
    }
    if (!isNaN(calcDisplay.textContent) && firstOperand !== null && currentOperator) {
        secondOperand = parseFloat(calcDisplay.textContent);
    }
    if (secondOperand === null || isNaN(secondOperand)) {
        return; // Exit without calculating
    }

    calculate();
    firstOperand = null;
    currentOperator = null;
    
});
// Clear/AC button logic to clear all previous operations
clearButton.addEventListener('click', () => {
    calcDisplay.textContent = '';
    firstOperand = null;
    currentOperator = null;
    secondOperand = null;
    result = null;
    console.log(result);
});
// Perform the calculation based on user inputs
function operate(currentOperator, firstOperand, secondOperand){
    switch (currentOperator){
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            if (secondOperand != 0){
                return firstOperand / secondOperand;
            }
                return "Bruh";       
        }
}

function calculate(){
    const result = operate(currentOperator, firstOperand, secondOperand);
    calcDisplay.textContent = result;
}

operate();