const calculator = {
    currentOperationDisplay : document.getElementById("current-operation"),
    previousOperationDisplay : document.getElementById("previous-operation"),
    numberButtons : document.querySelectorAll('.number-buttons'),
    operatorButtons : document.querySelectorAll('.operators-buttons'),
    equalsButton : document.getElementById('equals-button'),
    clearButton : document.getElementById('clear-button'),
    deleteButton : document.getElementById('delete-button'),

    // Initial values
    init: function() {
        this.currentOperationDisplay.textContent = '0'; // calculator display by default is 0
        this.previousOperation = '';
        this.currentOperator = null;
        this.currentOperation = '';
        this.isMaxDigits = false; // Max digits a user can use per operand is 10
    },

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
                    this.previousOperation = this.calculate();  // Perform the operation and update the display
                    this.currentOperation = null;  // Reset second operand
                } else {
                    // If no calculation has been made yet, set the first operand
                    this.previousOperation = parseFloat(this.currentOperationDisplay.textContent);
                }
            
                // Update the current operator and display it
                this.currentOperator = button.value;
                this.currentOperationDisplay.textContent = `${this.previousOperation} ${this.currentOperator} `;
            });
        });
    },
        // Equals button logic to perform operation
    handleEqualsButtons : function() {
        this.equalsButton.addEventListener('click', () => {
            // If there is no first operand, no calculation will be made    
            if (this.previousOperation === null || this.currentOperator === null){
                return;
            }
            // However if a number is displayed, we will use this as the first operand
            if(!isNaN(parseFloat(this.currentOperationDisplay.textContent)) && this.currentOperationDisplay.textContent.trim() !== ''){
                this.previousOperation = parseFloat(this.currentOperationDisplay.textContent);
            }
        
            if (!isNaN(this.currentOperationDisplay.textContent) && this.previousOperation !== null && this.currentOperator) {
                this.currentOperation = parseFloat(this.currentOperationDisplay.textContent);
            }
        
            if (this.currentOperation === null || isNaN(this.currentOperation)) {
                return; // Exit without calculating
            }
        
            this.calculate();
            this.previousOperation = null;
            this.currentOperator = null;

        });
    },

        // Clear/AC button logic to clear all previous operations
    handleClearButton : function(){
        this.clearButton.addEventListener('click', () => {
            this.currentOperationDisplay.textContent = '0';
            this.previousOperation = 0;
            this.currentOperator = null;
            this.currentOperation = 0;
            this.isMaxDigits = false;
        });
    },   
        // Perform the calculation based on user inputs
    operate : function() {
        switch (this.currentOperator){
            case '+':
                return this.previousOperation + this.currentOperation;
            case '-':
                return this.previousOperation - this.currentOperation;
            case '*':
                return this.previousOperation * this.currentOperation;
            case '/':
                if (this.currentOperation != 0){
                    return this.previousOperation / this.currentOperation;
                }
                    return "Bruh";       
            }
    },
        // Convert larger numbers into scientific notation
    handleScientificNumber : function(num) {
        if (num >= 1e10 || num <= 1e-10) {
            return num.toExponential(2);
        }
        return num;
    },

    calculate : function(){
        let result = this.operate(this.currentOperator, this.previousOperation, this.currentOperation);
        this.currentOperationDisplay.textContent = this.handleScientificNumber(result);
        return result;
    },
        
// }

}

document.addEventListener('DOMContentLoaded', () => {
    calculator.handleNumberButtons();
    calculator.handleOperatorButtons();
    calculator.handleEqualsButtons();
    calculator.handleClearButton();
    calculator.init();
});
