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
        // Exit if the current display content is invalid
        if (isNaN(parseFloat(calcDisplay.textContent)) || calcDisplay.textContent.trim() === '') {
            return;
        }

        // If there is a valid first operand and an operator, perform the calculation
        if (firstOperand !== null && currentOperator !== null) {
            secondOperand = parseFloat(calcDisplay.textContent);
            firstOperand = calculate();  // Perform the operation and update the display
            secondOperand = null;  // Reset second operand
        } else {
            // If no calculation has been made yet, set the first operand
            firstOperand = parseFloat(calcDisplay.textContent);
        }

        // Update the current operator and display it
        currentOperator = button.value;
        calcDisplay.textContent = currentOperator;
    });
});
 
// Equals button logic to perform operation
equalsButton.addEventListener('click', () => {
// If there is no first operand, no calculation will be made    
    if (firstOperand === null || currentOperator === null || isNaN(firstOperand)){
        return;
    }
    // However if a number is displayed, we will use this as the first operand
    if(!isNaN(parseFloat(calcDisplay.textContent)) && calcDisplay.textContent.trim() !== ''){
        firstOperand = parseFloat(calcDisplay.textContent);
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
// Convert larger numbers into scientific notation
function scientificNumber(num) {
    if (num >= 1e10 || num <= 1e-10) {
        return num.toExponential(2);
    }
    return num;
}

function calculate(){
    const result = operate(currentOperator, firstOperand, secondOperand);
    calcDisplay.textContent = scientificNumber(result);
    return result;
}

operate();