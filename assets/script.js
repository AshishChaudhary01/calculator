let Calculator = {
  num1: "",
  num2: "",
  operator: "",
  result: null,
  equation: "",
  progress: 0, // 0: entering num1, 1: operator selected, 2: result
}

function handleInput(triggeredBtn){
  if(!buttonsContainer.matches('button')) return;   // Handle exceptional case where input isn't a button
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