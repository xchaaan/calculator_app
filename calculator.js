var total = null;
var previous = 0;
var current = "";
var operator = null;
var display = document.getElementById("result")
var cButton = document.getElementById("clear")
var hasDecimal = false;
var isNegated = false;

function clearDisplay() {
    if (cButton.textContent == "AC") {
        // reset all variables to default state/value
        total = null;
        previous = 0;
        current = "";
        operator = null;
        lastTotal = 0;
    }
    else cButton.textContent = "AC";

    current = ""
    display.textContent = "0";
    hasDecimal = false; 
}

// function negate() {
//     current = display.textContent
//     current = isNegated == false ? current = "-" + current : current = current.substring(1);
//     isNegated = !isNegated
//     display.textContent = current;

// }

function setDecimal() {
    if (!hasDecimal) {
        current === "" ? current += "0." : current += "."
        display.textContent = current;
    }
    hasDecimal = true; // to avoid multiple decimal placement
    cButton.textContent = "C";
}

function setValue(value) {
    if (current.length < 9) current += value;

    display.textContent = current;
    cButton.textContent = "C";
}

function setOperator(optr) {
    operator = optr;
    
    if (previous === 0) {
        previous = total == null ? parseFloat(current) : parseFloat(total);
    }
    else if (previous > 0 && current.length > 0) {
        calculate()
    }
    current = ""
}

function calculate() {
    current = parseFloat(current);
    switch(operator) {
        case "+":
            if (!isNaN(current)) total = previous + current;
            else total += total
            break

        case "-":
            if (!isNaN(current)) total = previous - current;
            else total -= total
            break

        case "*":
            if (!isNaN(current)) total = (previous * current).toFixed(2);
            else total *= total
            break

        case "/":
            if (!isNaN(current)) total = (previous / current).toFixed(2);
            else if (!isFinite(total)) total = "Error"
            else total /= total
            break
    }
    previous = total;

    if (total.toString().length > 9) total = parseFloat(total).toExponential(0);
    display.textContent = total.toString();
}


