const digitBtns = document.querySelectorAll(".digit-btn");
const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");

let storedDigits = [];
let storedValues = [];

/*Add event listener for all buttons the container*/

btnContainer.addEventListener("click", (event) => {
    
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":
            updateDisplay(event);
            storeNumber(event.target.textContent);
            console.log(storedDigits)
            break;

        case "operator-btn":            
            updateDisplay(event);
            storedValues.push(storedDigits.join(""));
            storedDigits = [];
            storedValues.push(event.target.textContent);
            console.log(storedValues)
            break;

        case "equal-btn":
            storedValues.push(storedDigits.join(""));
            storedDigits = [];
            console.log(storedDigits)
            operate();
            break;
       }
     

        

    }



})

/* STORE THE NUMBERS */

function storeNumber (currentNum) {
   storedDigits.push(currentNum);
  
}

/* UPDATE THE DISPLAY */

function updateDisplay(e){

   
  display.textContent += e.target.textContent;
  

}

/* BASIC MATH FUNCTIONS */

function add(){

let result = 0;
 
    result = +storedValues[0] + +storedValues[2];
    storedValues.splice(0,3);
    storedValues.unshift(result);

    return;
}

function subtract(){

let result = 0;

    result = +storedValues[0] - +storedValues[2];
    storedValues.splice(0,3);
    storedValues.unshift(result);

    return;
}

function multiply(){

let result = 0;

    result = +storedValues[0] * +storedValues[2];
    storedValues.splice(0,3);
    storedValues.unshift(result);

    return;
}

function divide(){

let result = 0;

    result = +storedValues[0] / +storedValues[2];
    storedValues.splice(0,3);
    storedValues.unshift(result);

    return;
}

function operate () {

    console.log(storedValues);



    while (storedValues.length>1){

        switch(storedValues[1]){
            case '+':
                add();           
            break;

            case '-':
                subtract();           
            break;

            case '*':
                multiply();           
            break;

            case '/':
                divide();           
            break;
        }

        console.log(storedValues);
        
    }

    display.textContent = storedValues;

    storedDigits = [];
    storedValues = [];

    
        
        

/*
    switch (operator) {
        case '+':
            result = add(numbers);
            break;
        case '-':
            result = subtract(numbers);
            break;
        case '*':
            result = multiply(numbers);
            break;
        case '/':
            result = divide(numbers);
            break;
    }
*/

    return ;

}





