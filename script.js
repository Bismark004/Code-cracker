let secret_code = generateCode();
let  step_counter = 0;
document.getElementById("submit").addEventListener("click", getInput);


function getInput(){
  let x = document.getElementById('i_p').value;
  let o_p = document.getElementById("o_p");
  o_p.innerHTML = x;
  processInput(input);
}

function processInput(input){
    let n = input.length;
    if(document.getElementById("submit").innerHTML === "Reset"){
      cleanAll();
      return;
    }
    else if(n>4){
      o_p.innerHTML = "Input exceeds 4 character!";
      return;
    }
    else if(n<4){
      o_p.innerHTML = "Input is less than 4 character!";
      return;
    }
    else if (step_counter === 10){
      document.getElementById("is_game").innerHTML = "Fool, Your Loose! Eat some Horlics!";
      resetGame();
      return;
    }
    else {
      step_counter++;
      checkSubmission(input);
      return;
    }

  return;
} 

function generateCode(){
  let code = "";
  for(let i =0; i<4; i++){
    let n = getRandomIntInclusive(0, 9);
    code += n.toString();
  }
  document.getElementById("code").innerHTML = code;
  return code;
}

function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkSubmission(usr_input){
  let match = false;
  if(usr_input === secret_code){
    document.getElementById("is_game").innerHTML = "Good guess! You win!!";
    resetGame();
  }
  let result = "";

  for(let i =0; i<4; i++){
    let found = false;
    if(usr_input[i] === secret_code[i]){
      result += "Y ";
      found = true;
      continue;
    }
    for(let j = 0; j<4; j++){
      if(usr_input[i] === secret_code[j]){
        result += "E ";
        found = true;
        break;
      }
    }
    if (!found){
      result += "X ";
    }
  }
  document.getElementById("check").innerHTML = result;
  showSubmission(result, usr_input);
  return;
}
function showSubmission(result, usr_input) {
  let ul = document.getElementById("step");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(usr_input + " >>>   " +result));
  ul.appendChild(li);
}

function resetGame(){
  document.getElementById("submit").innerHTML = "Reset";
}

function cleanAll(){
  secret_code = generateCode();
  step_counter = 0;
  document.getElementById("step").innerHTML = "<li><b>Guess    &nbsp;&nbsp;&nbsp;     Result</b></li>"
  document.getElementById("submit").innerHTML = "Submit";
  return;
}
