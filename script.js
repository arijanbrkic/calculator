const calcDisplay = document.getElementById("calculator-display");
calcDisplay.textContent = "0";
const numberButtons = document.querySelectorAll('.number-buttons');
const operatorButtons = document.querySelectorAll('.operators-buttons');
let firstOperand = null;
let currentOperator = null;
let secondOperand = null;


//logic to get values for the operands
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
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
            console.log( firstOperand + currentOperator + secondOperand);
   
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