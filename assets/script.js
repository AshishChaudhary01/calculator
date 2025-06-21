let Calculator = {
  num1: "",
  num2: "",
  operator: "",
  result: null,
  equation: "",
  progress: 0, // 0: entering num1, 1: operator selected, 2: result
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

const buttonsContainer = document.querySelector("buttons-container");
buttonsContainer.addEventListener('click', (e) => {
  const triggeredBtn = e.target;
  handleInput(triggeredBtn);
});