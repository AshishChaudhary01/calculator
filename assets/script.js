const display = document.querySelector("#display");
const buttonsContainer = document.querySelector(".buttons-container");
let num1 = "";
let num2 = "";
let operator ="";
let equation = "";
let progress = 0;
let result = 0;
const displaySymbols = {
  '*': '×',
  '/': '÷',
  '+': '+',
  '-': '-',
  '%': '%',
};

function add(num1, num2){
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1,num2){
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1,num2){
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1,num2){
  return parseFloat(num1) / parseFloat(num2);
}

function remainder(num1, num2){
  return parseFloat(num1) % parseFloat(num2);
}

function showResult(){
  display.textContent = equation + "=" + result;
}

function operate(operator, num1, num2){
  switch(operator){
    case "+":
      result = add(num1, num2);
    break;
    case "-":
      result = subtract(num1, num2);
    break;
    case "*":
      result = multiply(num1, num2);
    break;
    case "/":
      result = divide(num1, num2);
    break;
    case "%":
      result = remainder(num1, num2);
    break;
    default:
      alert("Invalid Operator! Try something else.");
  }
  showResult();
}

function populateDisplay(char){
  if(char !== undefined){
    const displayChar = displaySymbols[char];
    equation = equation.concat(displayChar);
  }
  display.textContent = equation;
}

function handleInput(event){
  const target = event.target;
  const classList = target.classList;
  const inputIsDigit = classList.contains("digit");
  const inputIsDecimal = classList.contains("decimal");
  const inputIsOperator = classList.contains("operator");
  const inputIsAllClear = classList.contains("ac");
  const inputIsClear = classList.contains("clear");
  const inputIsEquals = classList.contains("equals");
  let input = target.value;

  if(inputIsAllClear){
    clearAll();
    return;
  }
  if(inputIsClear) {
    clear(); 
    return;   
  }

  if (progress>=2) {
    clearAll();
  }

  if(progress==1) {
    if(inputIsEquals && num2 == ""){
      alert("Invalid equation! Enter a valid equation first.");
      return;
    }
    if (inputIsDigit || inputIsDecimal) {
      num2 = num2.concat(input);
      equation = equation.concat(input);
      populateDisplay();
    }else if(inputIsEquals){
      progress+=1;
      operate(operator, num1, num2);
    }
  }

  if(progress==0){
    if(inputIsEquals){
      alert("Invalid equation! Enter a valid equation first.");
      return;
    }else if(inputIsDigit || inputIsDecimal){
      num1 = num1.concat(input);
      equation = equation.concat(input);
    }else if (inputIsOperator) {
      operator = input;
      progress+=1;
      equation = equation.concat(input);
    }
    populateDisplay();
  }
}

function clearAll(){
  num1 = "";
  num2 = "";
  operator = "";
  equation = "";
  result = "";
  progress = 0;
  display.textContent = equation;
}

function clear(){
  if(progress >= 2) {
    result = 0;
    equation = equation.slice(0, -1);
    num2 = num2.slice(0,-1);
    progress -= 1;
    populateDisplay();
  }else if(progress == 1){
    if(num2 == "" && operator != ""){
      progress -= 1;  
      operator = "";
      equation = equation.slice(0,-1);
    }else if(num2 != ""){
      num2 = num2.slice(0,-1);
      equation = equation.slice(0,-1);
    }
    populateDisplay();
  }else if(progress == 0){
    if(num1 != ""){
      num1 = num1.slice(0,-1);
      equation = equation.slice(0,-1);
      populateDisplay();
    }else{
      clearAll();
    }
  }
}

buttonsContainer.addEventListener('click', (event) => {
  handleInput(event);
});
