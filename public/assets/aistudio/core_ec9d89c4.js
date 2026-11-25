let precision = 200;

math.config({
number: "BigNumber",
precision: precision
});

let display=document.getElementById("display");

let memory=0;

let history=[];
let variables = {
A:0,
B:0,
C:0,
D:0,
E:0,
F:0,
X:0,
Y:0,
M:0

};
let lastAnswer=0;
let engShift = 0;

let degreeMode=true;
let currentMode = "NORMAL";

function append(value){

display.value += value;  

updatePreview();

}

function clearDisplay() {
    
    display.value = "";
    
    updatePreview();
    
    // Hide and clear the factorial result panel
    document.getElementById("factorialResultPanel").style.display = "none";
    document.getElementById("factorialResultText").textContent = "";
    
}

function backspace(){

display.value = display.value.slice(0,-1);  

updatePreview();

}

function calculate() {

try {  
      
    let expression = display.value;
    
    
expression = expression.trim();

const factorialMatch = expression.match(/^(\d+)!$/);

if (factorialMatch) {
    const n = BigInt(factorialMatch[1]);

    if (n > 157246n) {
        display.value = "Factorial limit exceeded";
        return;
    }

    const result = factorialExact(n);

    display.value = result;
    lastAnswer = result;
    addHistory(expression, result);
    return;
}


expression = expression.replace(/√/g, "sqrt(");

expression = expression.replace(/\bi\b/g, "1i");  
      
    expression = expression.replace(  
        /(\d+(\.\d+)?)%/g,  
        (_, n) => "(" + Number(n) / 100 + ")"  
    );  
      
    // Convert all numbers to BigNumbers  
    /*expression = expression.replace(  
        /\b\d+(\.\d+)?\b/g,  
        function(n) {  
            return 'bignumber("' + n + '")';  
        }  
    );*/  
  
if (degreeMode) {
    expression = expression.replace(
        /\bsin\(([^()]*)\)/g,
        "sin(($1)*pi/180)"
    );

    expression = expression.replace(
        /\bcos\(([^()]*)\)/g,
        "cos(($1)*pi/180)"
    );

    expression = expression.replace(
        /\btan\(([^()]*)\)/g,
        "tan(($1)*pi/180)"
    );
}

let result = math.evaluate(expression);

const absResult = math.abs(result);

if (
math.largerEq(absResult, math.bignumber("1e10")) ||
(
math.larger(absResult, 0) &&
math.smaller(absResult, math.bignumber("1e-9"))
)
){

let formatted = math.format(result, {  
precision: 15,  
notation: "exponential"

});

formatted = formatted.replace(
/e+?(-?\d+)/,
" × 10^$1"
);

formatted = toSuperscriptExponent(formatted);

display.value = formatted;

display.value = formatted;

}  
    else {  
          
        let formatted = math.format(result,{  
precision:15,  
notation:"fixed"

});

setPreview(formatted);

display.value = formatted;

}  
      
    lastAnswer = result;  
      
    addHistory(expression, display.value);  
      
}

catch (error) {

console.error(error);  

display.value = "Error";

}

}

function toSuperscriptExponent(text) {

const superscriptDigits = {  
    "0": "⁰",  
    "1": "¹",  
    "2": "²",  
    "3": "³",  
    "4": "⁴",  
    "5": "⁵",  
    "6": "⁶",  
    "7": "⁷",  
    "8": "⁸",  
    "9": "⁹",  
    "-": "⁻",  
    "+": "⁺"  
};  

return text.replace(  
    /10\^(-?\+?\d+)/g,  
    function(match, exponent) {  
        return "10" + exponent  
            .split("")  
            .map(char => superscriptDigits[char] || char)  
            .join("");  
    }  
);

}

function factorialExact(n) {

n = BigInt(n);  

if (n < 0n) {  
    throw new Error(  
        "Factorial requires a non-negative integer."  
    );  
}  

let result = 1n;  

for (let i = 2n; i <= n; i++) {  
    result *= i;  
}  

return result.toString();

}

function factorial() {

try {  

    const expression = display.value.trim();  

    if (!/^\d+$/.test(expression)) {  
        throw new Error(  
            "Enter a non-negative integer first."  
        );  
    }  

    const n = BigInt(expression);  

    if (n > 157246n) {  
        throw new Error(  
            "Maximum factorial supported is 157246."  
        );  
    }  

    const result = factorialExact(n);  

    display.value = result;  
    lastAnswer = result;  

    if (typeof addHistory === "function") {  
        addHistory(expression + "!", result);  
    }  

} catch (error) {  

    console.error(error);  
    display.value = "Error: " + error.message;  

}

}

function finishCalculation(expression, result){

if(typeof result === "number"){  

    result = parseFloat(result.toFixed(10));  

}  

setPreview(result);  

display.value = result;  

lastAnswer = result;  

addHistory(expression, result);

}
function answer(){

display.value += lastAnswer;

}
function openFunctionMenu(){

document.getElementById("functionMenu").style.display = "block";  

loadFunctionMenu();

}

function closeFunctionMenu(){

document.getElementById("functionMenu").style.display = "none";

}
/*=========================================
STOPWATCH
=========================================*/

let stopwatchInterval = null;

let stopwatchStart = 0;

let stopwatchElapsed = 0;

let stopwatchRunning = false;

let lapCount = 1;

function openStopwatch(){

document.getElementById("stopwatchModal").style.display = "block";

}

function closeStopwatch(){

document.getElementById("stopwatchModal").style.display = "none";

}

function startStopwatch(){

if(stopwatchRunning) return;  

stopwatchRunning = true;  

stopwatchStart = Date.now() - stopwatchElapsed;  

stopwatchInterval = setInterval(updateStopwatch,10);

}

function pauseStopwatch(){

stopwatchRunning = false;  

clearInterval(stopwatchInterval);

}

function resetStopwatch(){

stopwatchRunning = false;  

clearInterval(stopwatchInterval);  

stopwatchElapsed = 0;  
lapCount = 1;  

document.getElementById("stopwatchDisplay").textContent =  
"00:00:00.000";  

document.getElementById("lapList").innerHTML = "";

}

function updateStopwatch(){

stopwatchElapsed = Date.now() - stopwatchStart;  

let ms =  
stopwatchElapsed % 1000;  

let totalSeconds =  
Math.floor(stopwatchElapsed/1000);  

let seconds =  
totalSeconds % 60;  

let minutes =  
Math.floor(totalSeconds/60) % 60;  

let hours =  
Math.floor(totalSeconds/3600);  

document.getElementById("stopwatchDisplay").textContent =  

    String(hours).padStart(2,"0") + ":" +  
    String(minutes).padStart(2,"0") + ":" +  
    String(seconds).padStart(2,"0") + "." +  
    String(ms).padStart(3,"0");

}

function lapStopwatch(){

if(!stopwatchRunning) return;  

const lap =  
document.createElement("div");  

lap.innerHTML =  
"<b>Lap " + lapCount + "</b> : " +  
document.getElementById("stopwatchDisplay").textContent;  

document.getElementById("lapList").prepend(lap);  

lapCount++;

}
/*=========================================
COUNTDOWN TIMER
=========================================*/

let timerInterval = null;

let timerRemaining = 0;

let timerRunning = false;

function openTimer(){

document.getElementById("timerModal").style.display = "block";

}

function closeTimer(){

document.getElementById("timerModal").style.display = "none";

}

function startTimer(){

if(timerRunning) return;  

if(timerRemaining === 0){  

    const hours =

parseInt(document.getElementById("timerHours").value) || 0;

const minutes =
parseInt(document.getElementById("timerMinutes").value) || 0;

const seconds =
parseInt(document.getElementById("timerSeconds").value) || 0;

timerRemaining =
hours * 3600 +
minutes * 60 +
seconds;

if(timerRemaining <= 0){

alert("Enter a valid time.");  

return;

}

}  

timerRunning = true;  

updateTimerDisplay();  

timerInterval = setInterval(function(){  

    timerRemaining--;  

    updateTimerDisplay();  

    if(timerRemaining <= 0){  

        clearInterval(timerInterval);  

        timerRunning = false;  

        timerRemaining = 0;  

        updateTimerDisplay();  
          
        if (navigator.vibrate) {  

navigator.vibrate([1000, 300, 1000, 300, 1000]);

}
alert("⏰ Time's Up!");

}  

},1000);

}

function pauseTimer(){

timerRunning = false;  

clearInterval(timerInterval);

}

function resetTimer(){

timerRunning = false;  

clearInterval(timerInterval);  

timerRemaining = 0;  

document.getElementById("timerHours").value = "";

document.getElementById("timerMinutes").value = "";

document.getElementById("timerSeconds").value = "";

updateTimerDisplay();

}

function updateTimerDisplay(){

const hours =  
Math.floor(timerRemaining / 3600);  

const minutes =  
Math.floor((timerRemaining % 3600) / 60);  

const seconds =  
timerRemaining % 60;  

document.getElementById("timerDisplay").textContent =  

    String(hours).padStart(2,"0") + ":" +  
    String(minutes).padStart(2,"0") + ":" +  
    String(seconds).padStart(2,"0");

}

function togglePageMenu() {
    const menu = document.getElementById("pageMenu");

    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function closePageMenu() {
    document.getElementById("pageMenu").style.display = "none";
}

let currentButtonPage = 1;


function switchButtonPage(pageNumber) {
    const pages = document.querySelectorAll(".buttonPage");
    const selector = document.getElementById("pageSelector");

    pages.forEach((page) => {
        page.classList.remove("activePage");
    });

    const selectedPage = document.querySelector(
        '.buttonPage[data-page="' + pageNumber + '"]'
    );

    if (selectedPage) {
        selectedPage.classList.add("activePage");
        currentButtonPage = pageNumber;

        const pageNames = {
            1: "Basic",
            2: "Scientific",
            3: "Solvers",
            4: "Calculus & Graphs",
            5: "Advanced Math",
            6: "Tools"
        };

        if (selector) {
            selector.textContent = "▤ " + pageNumber + "/6 ▾";
            selector.title = pageNames[pageNumber] || "";
        }
    }

    closePageMenu();
}
