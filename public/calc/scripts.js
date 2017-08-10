'use strict';

var enteredValue;
var newValue;
var prevOperator;


var cat = function(name, age) {
    this.name = name;
    this.age = age;
}

cat.prototype.ages = 2000

console.log(cat.prototype)

window.onload = function() {
    resetToDefault()
}

var someObject = {
    name: {
        fName: "anmol",
        lName: "verma"
    }
}

Object.defineProperty(someObject, 'fullName', {
    get: function() {
        return someObject.name.fName + "    " + someObject.name.lName
    },
    set: function(value) {
        var nameParts = value.split(' ')
        this.name.fName = nameParts[0]
        this.name.lName = nameParts[1]
    }
})

console.log(someObject.fullName)
someObject.fullName = "john abrahim"
console.log(someObject.fullName)

var array = ['one', 'two', 'three'];

Object.defineProperty(Array.prototype, 'lastItem', {
    get: function() {
        return array[array.length - 1]
    }
})

console.log(array.lastItem)

function onClick(buttonId) {
    var buttonValue = document.getElementById(buttonId).value
    if (buttonValue == "clear_task") {
        resetToDefault()
    } else {
        performCalculations(buttonValue)
    }
}

function resetToDefault() {
    console.log("reset to defaults")
    enteredValue = null
    newValue = null
    prevOperator = null
    document.getElementById("mainField").value = ""
}

function isDecimal(buttonValue) {
    return buttonValue == "."
}

function performCalculations(buttonValue) {
    if (prevOperator == null) {
        if (!isNaN(buttonValue) || isDecimal(buttonValue)) {
            if (enteredValue == null) {
                if (isDecimal(buttonValue)) {
                    enteredValue = "."
                } else {
                    enteredValue = parseFloat(buttonValue)
                }
            } else {
                if (isDecimal(buttonValue)) {
                    enteredValue = enteredValue + "."
                } else {
                    enteredValue = enteredValue + "" + parseFloat(buttonValue)
                }
            }
            document.getElementById("mainField").value = enteredValue + ""
        } else {
            prevOperator = buttonValue
        }
    } else {
        if (!isNaN(buttonValue) || isDecimal(buttonValue)) {
            if (newValue == null) {
                if (isDecimal(buttonValue)) {
                    newValue = "."
                } else {
                    newValue = parseFloat(buttonValue)
                }
            } else {
                if (isDecimal(buttonValue)) {
                    newValue = newValue + "."
                } else {
                    newValue = newValue + "" + parseFloat(buttonValue)
                }
            }
            document.getElementById("mainField").value = newValue + ""
        } else {
            if (resultRequested(buttonValue)) {
                processOperatorCalculation()
            } else {
                if (prevOperator != null) {
                    processOperatorCalculation()
                }
                prevOperator = buttonValue
            }
        }
    }
}

function resultRequested(buttonValue) {
    return buttonValue == "="
}

function processOperatorCalculation() {
    switch (prevOperator) {
        case "=":
            enteredValue = parseFloat(enteredValue)
            document.getElementById("mainField").value = enteredValue
            updateEnteredValue()
            break;
        case "+":
            enteredValue = parseFloat(enteredValue) + parseFloat(newValue)
            updateEnteredValue()
            break;
        case "-":
            enteredValue = parseFloat(enteredValue) - parseFloat(newValue)
            updateEnteredValue()
            break;
        case "*":
            enteredValue = parseFloat(enteredValue) * parseFloat(newValue)
            updateEnteredValue()
            break;
        case "/":
            enteredValue = parseFloat(enteredValue) / parseFloat(newValue)
            updateEnteredValue()
            break;
    }

    function updateEnteredValue() {
        document.getElementById("mainField").value = enteredValue
        newValue = null
        prevOperator = null
    }

}