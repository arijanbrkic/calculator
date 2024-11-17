const calculator = {
    currentOperationDisplay : document.getElementById("current-operation"),
    previousOperationDisplay : document.getElementById("previous-operation"),
    numberButtons : document.querySelectorAll('.number-buttons'),
    operatorButtons : document.querySelectorAll('.operators-buttons'),
    equalsButton : document.getElementById('equals-button'),
    clearButton : document.getElementById('clear-button'),
    deleteButton : document.getElementById('delete-button'),
    result : null,

    // Initial values
    init: function() {
        this.currentOperationDisplay.textContent = '0'; // calculator display by default is 0
        this.previousOperation = '';
        this.currentOperator = null;
        this.previousOperator = null;
        this.currentOperation = '';
        this.isMaxDigits = false; // Max digits a user can use per operand is 9
    },

    // Calculator logic
    add : (a, b) => a + b,
    subtract : (a, b) => a - b,
    divide : (a, b) => a / b,
    multiply : (a, b) => a * b, 

    handleNumberButtons : function() {
        this.numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleInput(button.value);
            });
        });
    },

    // Logic for handling number input, for both mouse click and keyboard press
    handleInput: function(value) {
        // If user adds more than 9 digits, this exits the function
        if (this.currentOperationDisplay.textContent.length >= 9) {
            this.isMaxDigits = true;
        }
        if(this.isMaxDigits){
            console.log("Goodbye");
            return;
        }
        // User can not add more than one decimal point
        if (value === '.' && this.currentOperationDisplay.textContent.includes('.')) {
            return;
        }

        if (this.currentOperationDisplay.textContent === "0" || this.currentOperationDisplay.textContent === this.currentOperator) {
            this.currentOperationDisplay.textContent = value; 
        } else {
            this.currentOperationDisplay.textContent += value; // Append new value
        }
    },

    // Logic to get the operator
    handleOperatorButtons : function() {
        this.operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleOperator(button.value);
            });
        });
    },

    handleOperator: function(operator) {
        this.isMaxDigits = false;

        // Allow users to use - operator as a prefix for a negative number
        if (operator === '-' && (this.currentOperationDisplay.textContent === '0' || this.currentOperationDisplay.textContent === '')) {
            // If the current number is not negative, make it negative
            if (!this.currentOperationDisplay.textContent.startsWith('-')) {
                this.currentOperationDisplay.textContent = '-';
            } else {
                // If the number is already negative, remove the negative sign
                this.currentOperationDisplay.textContent = this.currentOperationDisplay.textContent.slice(1);
            }
            return;  // Don't do anything else (this is just toggling the sign)
        }

        // Check if an operator is already selected and allow switching
        if (this.currentOperator !== null && this.currentOperationDisplay.textContent === '0') {
            // Just update the operator and display, no need to reset operands
            this.currentOperator = operator;
            this.previousOperationDisplay.textContent = `${this.previousOperation} ${this.currentOperator}`;
            return;
        }

        // Exit if the current display content is invalid
        if (isNaN(parseFloat(this.currentOperationDisplay.textContent)) || this.currentOperationDisplay.textContent.trim() === '') {
            return;
        }

        if (this.currentOperation === '') {
            this.currentOperation = parseFloat(this.currentOperationDisplay.textContent);
        }

        // If there is a previous operation, calculate the result
        if (this.previousOperation !== '' && this.currentOperator !== null) {
            this.currentOperation = parseFloat(this.currentOperationDisplay.textContent);
            this.result = this.calculate(); // Perform the calculation
            this.previousOperation = this.result; // Update the previousOperation with the result
            this.currentOperation = ''; // Reset current operation for the next input
            this.currentOperationDisplay.textContent = '0';
            this.previousOperationDisplay.textContent = `${this.result} ${operator}`;
        } else {
            // Set the first operand if no previous operation exists
            this.previousOperation = parseFloat(this.currentOperationDisplay.textContent);
            this.result = this.previousOperation; // Set result to the first operand initially
            this.previousOperationDisplay.textContent = `${this.result} ${operator}`;
            this.currentOperationDisplay.textContent = '0';
        }
        // Update the current operator and display it
        this.currentOperator = operator;
    },

    // Equals button logic to perform operation
    handleEqualsButton : function() {
        this.equalsButton.addEventListener('click', () => {
            this.handleEquals();
        });
    },

    handleEquals: function() {
        // If there is no first operand or operator, exit
        if (this.previousOperation === null || this.currentOperator === null){
            return;
        }
        // If there is a number on the display, set it as current operand
        this.currentOperation = parseFloat(this.currentOperationDisplay.textContent);
        if (isNaN(this.currentOperation)) {
            return;
        }
        result = this.calculate();
        this.result = result;

        this.previousOperationDisplay.textContent = '';
        this.currentOperationDisplay.textContent = this.handleNumberDisplay(result); // Call updated function here
        this.previousOperation = this.handleNumberDisplay(result); // Update previousOperation with formatted result
        this.currentOperator = null;
    },

    // Format numbers for display
    handleNumberDisplay: function(num) {
        let numStr = num.toString();
    
        if (numStr.includes('.')) {
            let [integerPart, decimalPart] = numStr.split('.');
    
            if (integerPart.length + decimalPart.length > 9) {
                decimalPart = decimalPart.slice(0, 9 - integerPart.length);
            }
    
            return integerPart + '.' + decimalPart;
        }

        if (num >= 1e10 || num <= 1e-10) {
            return num.toExponential(2);
        }
    
        return numStr;
    },
    
    // Reset all operations and operator to original values
    resetCalculator : function() {
        this.currentOperation = '';
        this.currentOperationDisplay.textContent = '0';
        this.previousOperation = '';
        this.previousOperationDisplay.textContent = '';
        this.currentOperator = null;
        this.isMaxDigits = false;
    },

    // Clear/AC button logic to clear all previous operations
    handleClearButton : function(){
        this.clearButton.addEventListener('click', () => {
            this.resetCalculator();
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
                    return "DON'T DO IT";       
        }
    },

    calculate : function(){
        return this.operate();
    },
    
    // Add keyboard functionality
    handleKeyboardInput: function(event) {
        const key = event.key;

        // Handle number input (0-9, .)
        if (key >= '0' && key <= '9' || key === '.') {
            this.handleInput(key);
        }

        // Handle operator input (+, -, *, /)
        if (key === '+' || key === '-' || key === '*' || key === '/') {
            this.handleOperator(key);
        }

        // Handle equals button (=)
        if (key === 'Enter') {
            this.handleEquals();
        }

        // Handle clear button (C)
        if (key === 'c' || key === 'C') {
            this.resetCalculator();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    calculator.handleNumberButtons();
    calculator.handleOperatorButtons();
    calculator.handleEqualsButton();
    calculator.handleClearButton();
    calculator.resetCalculator();
    calculator.init();

    // Add event listener for keyboard input
    document.addEventListener('keydown', (event) => {
        calculator.handleKeyboardInput(event);
    });
});
