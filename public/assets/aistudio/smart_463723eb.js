/* ==========================================
   OP3CALCULATE - SMART COMMAND MODULE
   File: smart.js
========================================== */
const SMART_COMMANDS = [

/* ==========================================
   MATHEMATICS
========================================== */



{
category:"Mathematics",
title:"Solve Equation",
syntax:"solve x^2-5x+6=0",
description:"Solve linear, quadratic, cubic and quartic equations.",
keywords:["solve","roots","equation"],

action:function(text){

    display.value=text;
    solveEquation();

    return display.value;

}

},

{
category:"Graphs",
title:"Graph Function",
syntax:"graph x^2+3x-1",
description:"Plot a graph of a mathematical function.",
keywords:["graph","plot","draw"],

action:function(text){

    display.value=text;
    drawGraph();

    return "Graph plotted";

}

},

{
category:"Calculus",
title:"Differentiate",
syntax:"differentiate x^3+2x",
description:"Find the symbolic derivative.",
keywords:["differentiate","derivative","diff"],

action:function(text){

    display.value=text;
    symbolicDerivative();

    return display.value;

}

},

{
category:"Calculus",
title:"Integrate",
syntax:"integrate x^2",
description:"Evaluate a definite or symbolic integral.",
keywords:["integrate","integral"],

action:function(text){

    display.value=text;
    integrate();

    return display.value;

}

},

{
category:"Algebra",
title:"Simplify Expression",
syntax:"simplify (2x+3x)",
description:"Simplify an algebraic expression.",
keywords:["simplify"],

action:function(text){

    display.value=text;
    simplifyExpression();

    return display.value;

}

},

{
category:"Calculus",
title:"Limit",
syntax:"limit sin(x)/x",
description:"Calculate mathematical limits.",
keywords:["limit"],

action:function(text){

    display.value=text;
    calculateLimit();

    return display.value;

}

},

{
category:"Calculus",
title:"Taylor Series",
syntax:"taylor e^x",
description:"Expand a function into a Taylor series.",
keywords:["taylor"],

action:function(text){

    display.value=text;
    taylorSeries();

    return display.value;

}

},

{
category:"Numerical Methods",
title:"Newton Solver",
syntax:"newton x^3-2x-5",
description:"Solve numerically using Newton-Raphson.",
keywords:["newton"],

action:function(text){

    display.value=text;
    newtonSolver();

    return display.value;

}

},

{
category:"Numerical Methods",
title:"Bisection Method",
syntax:"bisection x^3-2x-5",
description:"Solve numerically using the Bisection Method.",
keywords:["bisection"],

action:function(text){

    display.value=text;
    bisectionMethod();

    return display.value;

}
},
/* ==========================================
   CHEMISTRY
========================================== */

{
category:"Chemistry",
title:"Molar Mass",
syntax:"molar mass H2SO4",
description:"Calculate the molar mass of a chemical compound.",
keywords:["molar mass"],

action:function(text){

    display.value=text;
    molecularMass();

    return display.value;

}

},

{
category:"Chemistry",
title:"Electron Configuration",
syntax:"electron configuration Fe",
description:"Generate the electron configuration of an element.",
keywords:["electron configuration"],

action:function(text){

    display.value=text;
    electronConfiguration();

    return display.value;

}

},

{
category:"Chemistry",
title:"Orbital Diagram",
syntax:"orbital diagram C",
description:"Generate the orbital diagram of an element.",
keywords:["orbital diagram"],

action:function(text){

    display.value=text;
    orbitalDiagram();

    return display.value;

}

},

{
category:"Chemistry",
title:"Periodic Table",
syntax:"periodic table",
description:"Open the interactive periodic table.",
keywords:["periodic table"],

action:function(){

    periodicTable();

    return "Periodic Table Opened";

}

},

{
category:"Chemistry",
title:"Chemistry Menu",
syntax:"chemistry",
description:"Open the chemistry tools menu.",
keywords:["chemistry"],

action:function(){

    chemistryMenu();

    return "Chemistry Menu Opened";

}

},
/* ==========================================
   MATRIX
========================================== */

{
category:"Matrix",
title:"Matrix Menu",
syntax:"matrix",
description:"Open the Matrix operations menu.",
keywords:["matrix"],

action:function(){

    matrixMenu();

    return "Matrix Menu Opened";

}

},

/* ==========================================
   VECTOR
========================================== */

{
category:"Vector",
title:"Vector Menu",
syntax:"vector",
description:"Open the Vector operations menu.",
keywords:["vector"],

action:function(){

    openVectorMenu();

    return "Vector Menu Opened";

}

},

/* ==========================================
   STATISTICS
========================================== */

{
category:"Statistics",
title:"Statistics Menu",
syntax:"statistics",
description:"Open the Statistics calculations menu.",
keywords:["statistics"],

action:function(){

    statisticsMenu();

    return "Statistics Menu Opened";

}

},

/* ==========================================
   COMPLEX
========================================== */

{
category:"Complex Numbers",
title:"Complex Mode",
syntax:"complex",
description:"Open Complex Number mode.",
keywords:["complex"],

action:function(){

    complexMenu();

    return "Complex Mode Opened";

}

},

/* ==========================================
   PROGRAMMING
========================================== */

{
category:"Programming",
title:"Programming Mode",
syntax:"program",
description:"Open the programming tools.",
keywords:["program"],

action:function(){

    programmingMenu();

    return "Programming Menu Opened";

}

},

/* ==========================================
   FORMULAS
========================================== */

{
category:"Reference",
title:"Formula Book",
syntax:"formula",
description:"Open the built-in mathematics formula book.",
keywords:["formula"],

action:function(){

    showFormulas();

    return "Formula Book Opened";

}

},

/* ==========================================
   CONSTANTS
========================================== */

{
category:"Reference",
title:"Physical Constants",
syntax:"constants",
description:"Open the physical and mathematical constants list.",
keywords:["constants"],

action:function(){

    constants();

    return "Constants Menu Opened";

}

}];
function executeSmartCommand(lower, command){

    for(let cmd of SMART_COMMANDS){

        for(let key of cmd.keywords){

            if(lower.startsWith(key + " ")){

                let text = command.substring(key.length + 1);

                let result = cmd.action(text);

                if(result !== undefined){

                    addHistory(
                        "SMART: " + command,
                        result
                    );

                }

                return;

            }

            if(lower === key){

                let result = cmd.action("");

                if(result !== undefined){

                    addHistory(
                        "SMART: " + command,
                        result
                    );

                }

                return;

            }

        }

    }

    display.value = "Unknown Command";

}
  function smartCommand(){

    document.getElementById("smartModal").style.display = "block";

    document.getElementById("smartInput").value = "";

    document.getElementById("smartInput").focus();

}
function closeSmartModal(){

    document.getElementById("smartModal").style.display = "none";

}

function openSmartHelp(){

    document.getElementById("smartHelpModal").style.display = "block";

    smartHelp();

}

function closeSmartHelp(){

    document.getElementById("smartHelpModal").style.display = "none";

}

function executeSmart(){

    let command = document.getElementById("smartInput").value.trim();

    if(command==="") return;

    let lower = command.toLowerCase();

    executeSmartCommand(lower, command);

    closeSmartModal();

}
function smartHelp(){

    let container = document.getElementById("smartHelpContent");

    container.innerHTML = "";

    let currentCategory = "";

    SMART_COMMANDS.forEach(function(cmd){

        if(cmd.category !== currentCategory){

            currentCategory = cmd.category;

            container.innerHTML +=
            "<h2>" + currentCategory + "</h2>";

        }

        container.innerHTML +=
        `
        <div class="smartCard">

            <h3>${cmd.title}</h3>

            <p>${cmd.description}</p>

            <code>${cmd.syntax}</code>

            <br><br>

            <button onclick="useSmartCommand('${cmd.syntax}')">
            Use
            </button>

        </div>
        `;

    });

}
function useSmartCommand(command){

    document.getElementById("smartInput").value = command;

    closeSmartHelp();

}
function searchSmartHelp(){

    let search =
    document.getElementById("smartSearch")
    .value
    .toLowerCase();

    let container =
    document.getElementById("smartHelpContent");

    container.innerHTML="";

    let currentCategory="";

    SMART_COMMANDS.forEach(function(cmd){

        if(

            !cmd.title.toLowerCase().includes(search) &&

            !cmd.syntax.toLowerCase().includes(search) &&

            !cmd.description.toLowerCase().includes(search)

        ){

            return;

        }

        if(cmd.category!==currentCategory){

            currentCategory=cmd.category;

            container.innerHTML +=
            "<h2>"+currentCategory+"</h2>";

        }

        container.innerHTML +=
        `
        <div class="smartCard">

            <h3>${cmd.title}</h3>

            <p>${cmd.description}</p>

            <code>${cmd.syntax}</code>

            <br><br>

            <button onclick="useSmartCommand('${cmd.syntax}')">

            Use

            </button>

        </div>
        `;

    });

}
function showSmartSuggestions(){

    let input = document.getElementById("smartInput").value.toLowerCase().trim();

    let box = document.getElementById("smartSuggestions");

    box.innerHTML = "";

    if(input === ""){

        box.style.display = "none";
        return;

    }

    SMART_COMMANDS.forEach(function(cmd){

        let match =

            cmd.title.toLowerCase().includes(input) ||

            cmd.syntax.toLowerCase().includes(input) ||

            cmd.description.toLowerCase().includes(input) ||

            cmd.keywords.some(function(key){

                return key.toLowerCase().includes(input);

            });

        if(match){

            let item = document.createElement("div");

            item.className = "smartSuggestion";

            item.innerHTML =
            "<b>" + cmd.title + "</b><br>" +
            "<small>" + cmd.syntax + "</small>";

            item.onclick = function(){

                document.getElementById("smartInput").value = cmd.syntax;

                box.style.display = "none";

            };

            box.appendChild(item);

        }

    });

    box.style.display = box.children.length ? "block" : "none";

}
function loadFunctionMenu(){

    let container = document.getElementById("functionMenuContent");

    container.innerHTML = "";

    let currentCategory = "";

    SMART_COMMANDS.forEach(function(cmd){

        if(cmd.category !== currentCategory){

            currentCategory = cmd.category;

            container.innerHTML +=
            "<h2>" + currentCategory + "</h2>";

        }

        container.innerHTML +=
        `
        <div class="functionCard">

            <h3>${cmd.title}</h3>

            <p>${cmd.description}</p>

            <code>${cmd.syntax}</code>

            <button onclick="useFunction('${cmd.syntax}')">

                Use

            </button>

        </div>
        `;

    });

}
function useFunction(command){

    closeFunctionMenu();

    smartCommand();

    setTimeout(function(){

        document.getElementById("smartInput").value = command;

    },100);

}
function loadFunctionMenu(){

    let container = document.getElementById("functionMenuContent");

    container.innerHTML = "";

    let currentCategory = "";

    SMART_COMMANDS.forEach(function(cmd){

        if(cmd.category !== currentCategory){

            currentCategory = cmd.category;

            container.innerHTML +=
            `<h2>${currentCategory}</h2>`;

        }

        container.innerHTML +=
        `
        <div class="functionCard">

            <h3>${cmd.title}</h3>

            <p>${cmd.description}</p>

            <code>${cmd.syntax}</code>

            <button onclick="useFunction('${cmd.syntax}')">
                Use
            </button>

        </div>
        `;

    });

}
function useFunction(command){

    closeFunctionMenu();

    smartCommand();

    setTimeout(function(){

        document.getElementById("smartInput").value = command;

    },100);

}
function searchFunctionMenu(){

    let search = document
        .getElementById("functionSearch")
        .value
        .toLowerCase()
        .trim();

    let container = document.getElementById("functionMenuContent");

    container.innerHTML = "";

    let currentCategory = "";

    SMART_COMMANDS.forEach(function(cmd){

        let match =

            cmd.category.toLowerCase().includes(search) ||

            cmd.title.toLowerCase().includes(search) ||

            cmd.syntax.toLowerCase().includes(search) ||

            cmd.description.toLowerCase().includes(search);

        if(!match) return;

        if(cmd.category !== currentCategory){

            currentCategory = cmd.category;

            container.innerHTML +=
            "<h2>" + currentCategory + "</h2>";

        }

        container.innerHTML +=
        `
        <div class="functionCard">

            <h3>${cmd.title}</h3>

            <p>${cmd.description}</p>

            <code>${cmd.syntax}</code>

            <button onclick="useFunction('${cmd.syntax}')">

                Use

            </button>

        </div>
        `;

    });

}