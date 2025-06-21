let Calculator = {
  num1: "",
  num2: "",
  operator: "",
  secondOperator: "",
  result: null,
  equation: "",
  progress: 0, // 0: entering num1, 1: operator selected, 2: result
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
  updateDisplay();
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
  returnnum1 - num2;
}

function multiply() {
  returnnum1 * num2;
}

function divide() {
  returnnum1 / num2;
}

function remainder() {
  returnnum1 % num2;
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
}

const buttonsContainer = document.querySelector("buttons-container");
buttonsContainer.addEventListener('click', (e) => {
  const triggeredBtn = e.target;
  handleInput(triggeredBtn);
});