function myFunction(id) {
  document.calc.result.value+=id;
}

// Clears calculator input screen
function clearScreen() {
  document.calc.result.value="";
}

function squirt(id) {
  document.calc.result.value+=id;
}

// Create readCookie
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Read cookie
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

// create cookie if not exist
  if(!document.cookie.includes('calculationHistory')) {
    createCookie('calculationHistory','[]', 360);
  }
  var calculationHistory = JSON.parse(readCookie('calculationHistory'));


function displayCalculationHistory() {
 document.getElementById('calculationHistory').innerHTML += calculationHistory.join('');
}

function updateCookie(name, value) {
  if(calculationHistory.length == 10) {
    calculationHistory.shift();
  }
  calculationHistory.push(value);
  eraseCookie('calculationHistory');
  createCookie('calculationHistory', JSON.stringify(calculationHistory), 360);
}

window.onload = function() {
  displayCalculationHistory();
}



// Calculates input values
function calculate() {
  try {
    value = document.calc.result.value;
    if(value.includes("√")){
      var input = Math.sqrt(value.replace('√', ''));
    } else{
      var input = eval(document.calc.result.value);
    }
    document.calc.result.value = input;
    html = "<p>" + value + " = " + input + "</p>";
    document.getElementById('calculationHistory').innerHTML += html;
    updateCookie('calculationHistory', html);
  } catch(err){
      document.calc.result.value="Error";
    }
}