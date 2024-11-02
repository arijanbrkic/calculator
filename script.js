const calcDisplay = document.getElementById("calculator-display");
calcDisplay.textContent = "0";
const numberButtons = document.querySelectorAll('.number-buttons');

// operators
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