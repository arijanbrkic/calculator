const calculator = {
    currentOperationDisplay : document.getElementById("current-operation"),
    previousOperationDisplay : document.getElementById("previous-operation"),
    numberButtons : document.querySelectorAll('.number-buttons'),
    operatorButtons : document.querySelectorAll('.operators-buttons'),
    equalsButton : document.getElementById('equals-button'),
    clearButton : document.getElementById('clear-button'),
    deleteButton : document.getElementById('delete-button'),

    currentOperator : null,
    previousOperation : '',
    currentOperation : '',

    isMaxDigits : false, // Max digits a user can use per operand is 10

    // Calculator logic
    add : (a, b) => a + b,
    subtract : (a, b) => a - b,
    divide : (a, b) => a / b,
    multiply : (a, b) => a * b, 

    handleNumberButtons : function() {
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                // If user adds more than 10 digits, this exits the function
                if (this.currentOperationDisplay.textContent.length >= 10) {
                    this.isMaxDigits = true;
                }
                if(this.isMaxDigits){
                    console.log("Goodbye");
                    return;
                }
                // User can not add more than one decimal point
                if (button.value === '.' && this.currentOperationDisplay.textContent.includes('.')) {
                    return;
                }
        
                if (this.currentOperationDisplay.textContent === "0" || this.currentOperationDisplay.textContent === this.currentOperator) {
                    this.currentOperationDisplay.textContent = button.value; 
                } else {
                    this.currentOperationDisplay.textContent += button.value; // Append new value
                }
            });
        });
    },

    // Logic to get the operator
    handleOperatorButtons : function() {
        this.operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Exit if the current display content is invalid
                if (isNaN(parseFloat(this.currentOperationDisplay.textContent)) || this.currentOperationDisplay.textContent.trim() === '') {
                    return;
                }
            
                // If there is a valid first operand and an operator, perform the calculation
                if (this.currentOperation !== null && this.currentOperator !== null) {
                    this.currentOperation = parseFloat(this.currentOperationDisplay.textContent);
                    this.previousOperation = calculate();  // Perform the operation and update the display
                    this.currentOperation = null;  // Reset second operand
                } else {
                    // If no calculation has been made yet, set the first operand
                    this.currentOperation = parseFloat(this.currentOperationDisplay.textContent);
                }
            
                // Update the current operator and display it
                this.currentOperator = button.value;
                this.currentOperationDisplay.textContent = this.currentOperator;
                console.log(this.currentOperation + this.currentOperator + this.previousOperation)
            });
        });
    }

    
}

document.addEventListener('DOMContentLoaded', () => {
    calculator.handleNumberButtons();
    calculator.handleOperatorButtons();
});
