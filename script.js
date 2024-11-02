const calcDisplay = document.getElementById("calculator-display");
calcDisplay.innerText = "0";

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