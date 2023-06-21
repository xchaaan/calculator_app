var display = document.getElementById("result")
var clearButton = document.getElementById("clear")
var hasDecimal = false;
var isNegated = false;
var total = null;
var current = 0;
var previous = null;
var operator = null;
var toDisplayNewValue = false;
var equalFlag = false;

function clearDisplay() {
    if (clearButton.textContent == "AC") {
        total = null;
    }
    else {
        clearButton.textContent = "AC";
    }

    current = 0;
    isNegated = false;
    previous = null;
    display.textContent = "0";
    hasDecimal = false;
    console.log(current);
}

function addDecimal() {
    if (!hasDecimal) display.textContent += "."
    current = parseFloat(display.textContent)
    hasDecimal = true;
}

function addNegative() {
    current *= -1;
    isNegated = !isNegated

    if (!toDisplayNewValue)
        display.textContent = isNegated ? "-" + display.textContent : display.textContent.substring(1); 
    else
        // we should make the display content -0
        display.textContent = "-0"
}

function calculate(equalWasPressed) {

    switch(operator) {
        case "+":
            total = previous + current;    
            break

        case "-":
            total = previous - current;
            break

        case "*":
            total = previous * current;
            break

        case "/":
            total = previous / current;
            break
    }

    // check if total is finite
    if (!isFinite(total)) {
        display.textContent = "Error";
        return false
    }

    let totalStr = total.toString()
    
    if (totalStr.length > 9)
        if (operator == "*" || operator == "+")
            totalStr = total.toExponential(0);
        else
            totalStr = totalStr.substring(0, 9)

    display.textContent = totalStr;
    // set previous value to total
    // to calculate total and current when clear is not pressed yet 
    previous = total;
    toDisplayNewValue = false;
    
    if (equalWasPressed) equalFlag = equalWasPressed;
}

function setOperator(optr) {
    operator = optr;
    toDisplayNewValue = true;

    if (previous == null) {
        previous = current;
        current = 0;
    }

    if (previous > 0 && current > 0) {
        // we want to clone apple's calculator behavior 
        // where it do calculation when opeator was selected
        // when both previous and current has values
        // but we should not proceed here if equal button was pressed
        if (!equalFlag)
            calculate(false)
            current = 0;
    }
    
    // set equal was pressed back to default state
    equalFlag = false;
    hasDecimal = false; 
}


function updateDisplay(value) {
    
    if (current === 0) {
        // no decimal
        if (!hasDecimal) {
            if (!isNegated)
                display.textContent = value;
            else
                display.textContent = "-" + value;
        }
        else {
            if (display.textContent.length <= 8)
                display.textContent += value;
        }
    }
    else {
        if (display.textContent.length <= 8)
            if (!toDisplayNewValue)
                display.textContent += value
            else 
                display.textContent + value
                toDisplayNewValue = false;
    }

    clearButton.textContent = "C";
    current = parseFloat(display.textContent)
}

function setToPercentage() {
    toConvert = (parseFloat(display.textContent) / 100).toString()
    toStr = toConvert.toString()

    if (toStr.length > 9)
        toStr = toStr.substring(0, 9)

    display.textContent = toStr;
}




