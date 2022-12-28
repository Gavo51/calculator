const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");


let storedValues = [];
let currentValue = "";
let operated = 0; // flag variable to check if operate() has been called


/*Add event listener for keyboard inputs*/

window.addEventListener("keydown",function(e){

let key = e.key;

    if(key >= 0 || key <= 9 || key === '.' || key === ','){

            if(operated == 1){ // checking if operate() has been called
                restore();
                operated = 0;
            }

            if(key === ','){
                key = '.';
            }

        
        storeValue(key);
        updateDisplay();
   
    }

    if(key === '+' || key === '-' || key === '*' || key === '/'){

        operated = 0;
                
        storeValue(key); // stores the operator key on a different index at storedValues
        updateDisplay();

    }

    if(key === 'Enter'){
        operate();
    } 


    if(key === 'Backspace') {
        deleteNum();
    }

});


/*Add click event  listener for all buttons the container*/

btnContainer.addEventListener("click", (event) => {
    
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":

            if(operated == 1){ // checking if operate() has been called
                restore();
                operated = 0;
            }

            updateDisplay(event.target.textContent);
            storedValues += event.target.textContent; // concat the content of the current button into storedValues string
            break;

        case "operator-btn":              
            operated = 0; 
            updateDisplay(event.target.textContent);
            storedValues += " " + event.target.textContent + " "; 
            break;

        case "equal-btn":
            operate();
            break;

        case "clear-btn":
            restore();
            break;
       }
    }



})

// Updates the disppay
function updateDisplay(){

  display.textContent = storedValues.join('');  

}

function storeValue (value) {
    storedValues.push(value);
    console.log(storedValues);
}

function  deleteNum () {

    storedValues.pop();
    display.textContent = display.textContent.slice(display.textContent.length-1);

    console.log(storedValues);
    console.log(display.textContent);

   
}

//Clears everything
function restore () {

    display.textContent = "";
    storedValues = "";
    valuesArray = [];

}

/* BASIC MATH FUNCTIONS */

function add(array){
 
   return  +array[0] + +array[2];
   
}

function subtract(array){

    return +array[0] - +array[2];   

}

function multiply(array){

    return +array[0] * +array[2];
   
}

function divide(array){

    return +array[0] / +array[2];

}

function operateArray (array,result) { 

  
    array.splice(0,3);   // takes valuesArray and a operation function as arguments, then modify valuesArray 
    array.unshift(result);

    return;

}

function operate () {


   let jointArray = storedValues.map( function (value){
        return value;
   });

   console.log(jointArray);

/*
    while (valuesArray.length>1){

        switch(valuesArray[1]){
            case '+':
                operateArray(valuesArray,add(valuesArray))           
            break;

            case '-':
                operateArray(valuesArray,subtract(valuesArray))           
            break;

            case 'x':
                operateArray(valuesArray,multiply(valuesArray))           
            break;

            case '/':
                operateArray(valuesArray,divide(valuesArray))           
            break;
        }
        
        console.log(valuesArray)
    }

    storedValues = valuesArray[0].toString();
    display.textContent = storedValues;
    console.log('the display contains = '+display.textContent);
    operated = 1;

*/
    return ;

}










