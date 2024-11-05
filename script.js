const calcDisplay = document.getElementById("calculator-display");
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operators-buttons');
calcDisplay.textContent = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let isMaxDigits = false; // Max digits a user can use per operand is 10

// Calculator logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b; 

// Logic to get values for the operands
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

        if (calcDisplay.textContent === "0" || calcDisplay.textContent === currentOperator) {
            calcDisplay.textContent = button.value; 
        } else {
            calcDisplay.textContent += button.value; // Append new value
        }
    });
});
// logic to get the operator
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(firstOperand === null){
            firstOperand = parseFloat(calcDisplay.textContent);
   
        } else if (currentOperator && calcDisplay.textContent !== ''){
            secondOperand = parseFloat(calcDisplay.textContent);
   
    }
        currentOperator = button.value;
        calcDisplay.textContent = currentOperator;
        console.log( firstOperand + currentOperator + secondOperand);
    });
});

//perform the calculation based on user inputs
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
                return "Come on dude...";       
        }
}

function calculate(){
    const result = operate();
    calcDisplay.textContent = result;
}