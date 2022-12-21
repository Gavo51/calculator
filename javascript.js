const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");


let storedValues = "";
let valuesArray = [];
let operated = 0; // flag variable to check if operate() has been called

/*Add event listener for all buttons the container*/

btnContainer.addEventListener("click", (event) => {
    
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":

            if(operated == 1){ // checking if operate() has been called
                restore();
                operated = 0;
            }

            updateDisplay(event);
            storedValues += event.target.textContent; // concat the content of the current button into storedValues string
            console.log(storedValues);
            break;

        case "operator-btn":              
            operated = 0; 
            updateDisplay(event);
            storedValues += " " + event.target.textContent + " "; 
            console.log(storedValues);
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
function updateDisplay(e){
   
  display.textContent += e.target.textContent;  

}

// checks if operate() has been called

//Clears everything
function restore (){

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

    // turn the string into an array separated by spaces
    valuesArray = storedValues.split(" "); 
    console.log(valuesArray);

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

        console.log(valuesArray);
        
    }

    storedValues = valuesArray[0];
    display.textContent = storedValues;
    continuityCheck = 1;

    return ;

}





