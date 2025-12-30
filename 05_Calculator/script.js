/*future feature reset after equal sign use flag?*/
// might not even need flag just update display then remove the number1
// Format decimal numbers to prevent overflow
//get the decimal working

const oDisplay = document.querySelector(".operations.display");
const rDisplay = document.querySelector(".result.display");


function add (a, b) {
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function updateOpsDisplay(equation){
    let number1 = equation.number1 || "";
    let number2 = equation.number2 || "";
    let operator = equation.operator || "";

    oDisplay.textContent = `${number1}` + `${operator}` + `${number2}`;

}

function updatePercent(equation){
    rDisplay.textContent = Number(equation.number1.slice(0, -1))/100;
}

function updateResDisplay(equation){
    const result = operate(equation);
    rDisplay.textContent = result;
}

function operate(equation){
    let number1;
    let number2;
    if (equation.n1Percent == 1){
         number1 = Number(equation.number1.slice(0, -1))/100;
    } else{
        number1 = Number(equation.number1);
    }
    if (equation.n2Percent == 1){
         number2 = Number(equation.number2.slice(0, -1))/100;
    } else {
        number2 = Number(equation.number2);
    }
    
    
    let operator = equation.operator;
    let result;

    if (!Number(number1) || !Number(number2)){
        console.log("Invalid number");
    }
    if (operator === '+'){
        result = add(number1, number2);
    } else if (operator === '-'){
        result = subtract(number1, number2);
    } else if (operator === '×'){
        result = multiply(number1, number2);
    } else if (operator === '÷'){
       result = divide(number1, number2);
    } else {
        console.log("Invalid operator");
        return;
    }
    return result.toFixed(5);
}

function clear(equation){
    for (let key in equation) {
        delete equation[key];
    }
    oDisplay.innerHTML="";
    rDisplay.innerHTML="";
}

function equate(equation){
    let number2 = equation.number2 || "";
    let operator = equation.operator || "";

    if (number2 != ""){
        equation.number1 = rDisplay.textContent;
        delete equation["number2"];
        delete equation["operator"];
        delete equation["n1Decimal"];
        delete equation["n2Decimal"];
        delete equation["n1Percent"];
        delete equation["n2Percent"];
        rDisplay.innerHTML="";
        updateOpsDisplay(equation);
    }else if (number2 == "" && operator != ""){
        alert("Wrong Format!");
    } else {
        return;
    }
}

function backspace(equation){
    let number1 = equation.number1 || "";
    let number2 = equation.number2 || "";
    let operator = equation.operator || "";

    if (number2 != ""){
        if (number2[number2.length - 1] == '.'){
            delete equation["n2Decimal"];
        } else if (number2[number2.length - 1] == '%'){
            delete equation["n2Percent"];
        }
        equation.number2 = number2.slice(0, -1);      
        if (equation.number2 == ""){
            delete equation["number2"];
            rDisplay.innerHTML="";
            return;
        }
        updateResDisplay(equation);
    } else if (operator != ""){
        delete equation["operator"];
    } else if (number1 != ""){
        if (number1[number1.length - 1] == '.'){
            delete equation["n1Decimal"];
        }else if (number1[number1.length - 1] == '%'){
            delete equation["n1Percent"];
            rDisplay.innerHTML = '';
        }
        equation.number1 = number1.slice(0, -1);
    } else {
        return;
    }
}

function symbol(button, equation){
    let number1 = equation.number1 || "";
    let number2 = equation.number2 || "";
    let operator = equation.operator || "";

    if (button.value == '.'){
        if (operator == ""){
            if (equation.n1Decimal == 1){
                return;
            }
            if (number1 != ""){
                equation.number1 += '.';
            }else {
                equation.number1 += '0.';
            }
            equation.n1Decimal = 1;
        } else {
            if (equation.n2Decimal == 1){
                return;
            }
            if (number2 != ""){
                equation.number2 += '.';
            }else {
                equation.number2 += '0.';
            }
            equation.n2Decimal = 1;
        }
    }else if (button.value == '%'){
        if (operator == ""){
            if (equation.n1Percent == 1){
                return;
            }
            if (number1 != ""){
                equation.number1 += '%';
                equation.n1Percent = 1;
                updatePercent(equation);
            }else {
                alert("Invalid Format");
            }
        } else {
            if (equation.n2Percent == 1){
                return;
            }
            if (number2 != ""){
                equation.number2 += '%';
                equation.n2Percent = 1;
                updateResDisplay(equation);
            }else {
                alert("Invalid Format");
            }
        }

    }
}

function main(){
    let equation = {};

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains("number")){
                if (!("operator" in equation)){
                    equation.number1 = (equation.number1 || "") + button.value;
                } else {
                    equation.number2 = (equation.number2 || "") + button.value;
                    updateResDisplay(equation);
                }                
            } else if (button.classList.contains("operator")){
                if ("number2" in equation){
                    equate(equation);
                    equation.operator = button.value;
                } else if ("number1" in equation){
                    equation.operator = button.value;
                } else {
                    alert("Invalid Format!");
                    return;
                }
            } else if (button.classList.contains("symbol")){
                symbol(button, equation);
            } else if (button.id.includes('clear')){
                clear(equation);
            } else if (button.id.includes('equal')){
                equate(equation);
            } else if (button.id.includes('delete')){
                backspace(equation);
            } 

            updateOpsDisplay(equation);
            
        })
    })
}

main();