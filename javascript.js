const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");


let storedValues = "";
let valuesArray = [];
let operated = 0; // flag variable to check if operate() has been called


/*Add event listener for keyboard inputs*/

window.addEventListener("keydown",function(e){

   if(e.key>=0 || e.key<=9){

    if(operated == 1){ // checking if operate() has been called
        restore();
        operated = 0;
    }

    updateDisplay(e.key);
    storedValues += e.key;
   }

   if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
    operated = 0;
    updateDisplay(e.key);
    storedValues += " " + e.key + " ";
   }

    if(e.key === 'Enter'){
        operate();
    } 

    if(e.key === ',' || e.key === '.') {
        updateDisplay('.');
        storedValues += '.';
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
function updateDisplay(key){
  
    console.log(typeof(key));
  display.textContent += key;  

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
        
        console.log(valuesArray)
    }

    storedValues = valuesArray[0].toString();
    display.textContent = storedValues;
    console.log('the display contains = '+display.textContent);
    operated = 1;


    return ;

}








