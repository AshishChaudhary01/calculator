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
  Calculator.equation = (Calculator.equation).concat(
    Calculator.num1
    , Calculator.operator
    , Calculator.num2
    , () => {
      return (Calculator.result) ? Calculator.result : "";
    });
}

const display = document.querySelector("#display");
function updateDisplay() {
  display.textContent = equation;
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
      }
    }
  }

  // Trim the last digit of the result and use it as the num1 for the 
  // next operation 
  if (Calculator.progress == 2) {
    resetCalculator();
    Calculator.num1 = trimLastDigit(Calculator.result);
  }
}

function parseOperands() {
  Calculator.num1 = parseFloat(Calculator.num1);
  Calculator.num2 = parseFloat(Calculator.num2);
}

function formatResult() {
  let tempResult = Calculator.result;
  Calculator.result = Number.isInteger(tempResult)
    ? tempResult
    : tempResult.toFixed(2);    // Keep only the 2 digits after the decimal
}

function add() {
  return num1 + num2;
}

function subtract() {
  return num1 - num2;
}

function multiply() {
  return num1 * num2;
}

function divide() {
  return num1 / num2;
}

function remainder() {
  return num1 % num2;
}

function inputOperand(value) {
  if (Calculator.progress == 0) {
    Calculator.num1 = (Calculator.num1).concat(value);
  } else if (Calculator.progress == 1) {
    Calculator.num2 = (Calculator.num2).concat(value);
  } else if (Calculator.progress == 2) {    // Take any operand after showing the result as the first operand for the next operation
    resetCalculator();
    Calculator.num1 = (Calculator.num1).concat(value);
  }
}

function inputOperator(value) {
  if (Calculator.progress == 0) {
    Calculator.operator = value;
  } else if (Calculator.progress == 1) {
    Calculator.secondOperator = value;
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
  if (!buttonsContainer.matches('button')) return;   // Handle exceptional case where input isn't a button
  const inputType = triggeredBtn.dataset.value;
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

const buttonsContainer = document.querySelector("buttons-container");
buttonsContainer.addEventListener('click', (e) => {
  const triggeredBtn = e.target;
  handleInput(triggeredBtn);
});