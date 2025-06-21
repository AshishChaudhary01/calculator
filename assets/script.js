let Calculator = {
  num1: "",
  num2: "",
  operator: "",
  secondOperator: "",
  result: null,
  equation: "",
  progress: 0, // 0: entering num1, 1: operator selected, 2: result
}

function updateEquation() {
  Calculator.equation = "";
  Calculator.equation = `${Calculator.num1}${Calculator.operator}${Calculator.num2}`;

  if (Calculator.result != null) {
    Calculator.equation = (Calculator.equation).concat("=", (Calculator.result).toString());
  }
}

const display = document.querySelector("#display");
function updateDisplay() {
  console.log(Calculator.equation);
  display.textContent = Calculator.equation;
}

function resetCalculator() {
  Calculator.num1 = "";
  Calculator.num2 = "";
  Calculator.operator = "";
  Calculator.secondOperator = "";
  Calculator.result = null;
  Calculator.equation = "";
  Calculator.progress = 0;
}

function clear() {
  if (Calculator.progress == 0) {
    if (Calculator.num1 != "") {
      // Clear last character of num1
      Calculator.num1 = (Calculator.num1).slice(0, -1);
    }
  }
  if (Calculator.progress == 1) {
    if (Calculator.num2 != "") {
      // Clear last character of num2
      Calculator.num2 = (Calculator.num2).slice(0, -1);
    } else {
      if (Calculator.secondOperator != "") {
        // Clear Second operator if present
        Calculator.secondOperator = "";
      } else {
        // Clear operator
        Calculator.operator = "";
        Calculator.progress = 0;
      }
    }
  }

  // Trim the last digit of the result and use it as the num1 for the 
  // next operation 
  if (Calculator.progress == 2) {
    resetCalculator();
  }
}

function parseOperands() {
  Calculator.num1 = parseFloat(Calculator.num1);
  Calculator.num2 = parseFloat(Calculator.num2);
}

function unParseOperands() {
  Calculator.num1 = (Calculator.num1).toString();
  Calculator.num2 = (Calculator.num2).toString();
}
function formatResult() {
  let tempResult = Calculator.result;
  Calculator.result = Number.isInteger(tempResult)
    ? tempResult
    : tempResult.toFixed(2);    // Keep only the 2 digits after the decimal
}

function add() {
  return Calculator.num1 + Calculator.num2;
}

function subtract() {
  return Calculator.num1 - Calculator.num2;
}

function multiply() {
  return Calculator.num1 * Calculator.num2;
}

function divide() {
  return Calculator.num1 / Calculator.num2;
}

function remainder() {
  return Calculator.num1 % Calculator.num2;
}

function operate() {
  if (Calculator.progress >=2) {
    return;
  }
  if (Calculator.num1 == "" || Calculator.operator == "" || Calculator.num2 == "") {
    alert("Invalid Equation! Try again.");
    return;
  }

  parseOperands();
  let tempResult;
  switch (Calculator.operator) {
    case "+":
      tempResult = add();
      break;
    case "-":
      tempResult = subtract();
      break;
    case "*":
      tempResult = multiply();
      break;
    case "/":
      if (Calculator.num2 == 0) {
        alert(
          "WTH bro!!! 🤨 You trying to crash the app!!??"
          + "\n You wont get the answer to this equation here"
          + "\n You'll find it within..."
        );
        unParseOperands();
        return;
      } else {
        tempResult = divide();
      }
      break;
    case "%":
      tempResult = remainder();
      break;

    default:
      alert("Invalid Operator! Please select a valid operator.");
      resetCalculator();
      return;
  }
  unParseOperands();
  Calculator.result = tempResult;
  Calculator.progress += 1;
}

function inputOperand(value) {
  if (value == ".") {
    if (Calculator.progress == 0) {
      if (Calculator.num1.includes(".")) {
        alert("Invalid Input! Only 1 decimal seperator('.') can be in a number.");
        return;
      }
    }
    if (Calculator.progress == 1) {
      if (Calculator.num2.includes(".")) {
        alert("Invalid Input! Only 1 decimal seperator('.') can be in a number.");
        return;
      }
    }
  }
  if (Calculator.progress == 0) {
    Calculator.num1 = (Calculator.num1).concat(value);
  } else if (Calculator.progress == 1) {
    Calculator.num2 = (Calculator.num2).concat(value);
  } else if (Calculator.progress == 2) {    // Take any operand after showing the result as the first operand for the next operation
    let tempNum1 = "";
    let tempOperator = "";
    if ((Calculator.secondOperator) != "") {
      tempNum1 = (Calculator.result).toString();
      tempOperator = Calculator.secondOperator;
    }
    resetCalculator();
    if (tempOperator != "") {
      tempNum1 = tempNum1.concat(value);
      Calculator.num1 = tempNum1;
      Calculator.operator = tempOperator;
      Calculator.num2 = value;
      Calculator.progress = 1;
    } else {
      Calculator.num1 = tempNum1.concat(value);
      console.log(Calculator);
    }
  }
}

function inputOperator(value) {
  if (Calculator.progress == 0) {
    Calculator.operator = value;
    Calculator.progress += 1;
  } else if (Calculator.progress == 1) {
    Calculator.secondOperator = value;
  } else if (Calculator.progress == 2) {
    let tempNum1 = (Calculator.result).toString();
    resetCalculator();
    Calculator.num1 = tempNum1;
    Calculator.operator = value;
    Calculator.progress = 1;
  }
}

function inputOption(value) {
  switch (value) {
    case ("ac"):
      resetCalculator();
      break;
    case ("c"):
      clear();
      break;
    case ("="):
      operate();
      break;
    default:
      alert("Invalid option!");
      break;
  }
}

function handleInput(triggeredBtn) {
  // if (!buttonsContainer.matches('button')) return;   // Handle exceptional case where input isn't a button
  const inputType = triggeredBtn.dataset.type;
  const value = triggeredBtn.value;
  if (inputType == "operand") {
    inputOperand(value);
  } else if (inputType == "operator") {
    inputOperator(value);
  } else if (inputType == "option") {
    inputOption(value);
  }
  updateEquation();
  updateDisplay();
}

const buttonsContainer = document.querySelector(".buttons-container");
buttonsContainer.addEventListener('click', (e) => {
  const triggeredBtn = e.target;
  handleInput(triggeredBtn);
});