function add(num1, num2){
  return num1+num2;
}

function subtract(num1,num2){
  return num1-num2;
}

function multiply(num1,num2){
  return num1*num2;
}

function dividie(num1,num2){
  return num1/num2;
}

function operate(operator, num1, num2){
  switch(operator){
    case "add":
      add(num1, num2);
    break;
    case "subtract":
      subtract(num1, num2);
    break;
    case "multiply":
      multiply(num1, num2);
    break;
    case "divide":
      dividie(num1, num2);
    break;
    default:
      alert("Invalid Operator! Try something else.");
  }
}