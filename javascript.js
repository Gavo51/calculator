const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");


let storedValues = "";


let triggerRefresh = false;         // flag variable to check if operate() has been called
let blockOperator = false;       // flag variable to check if an operator has been inputted

/*Add event listener for keyboard inputs*/

window.addEventListener("keydown",function(event) {

let key = event.key;

    if(key >= 0 || key <= 9 || key == '.' || key == ','){
        
        // checking if operate() has been called
        if(triggerRefresh){ 
            restoreData();
            triggerRefresh = false;
        }
      
        key = validateKey(key);
        storeValue(key);       
        blockOperator = false;        
    }

    if(key == '+' || key == '-' || key == '*' || key == '/'){

        triggerRefresh = false;

         // check if an operator key has been pressed twice
        if(!blockOperator) {
            storeValue(key); 
            blockOperator = true;
        }       
    }

    if(key === 'Enter'){
        operate();
    } 

    if(key === 'Backspace') {
        deleteValue();
    }

});


/*Add click event  listener for all buttons the container*/
btnContainer.addEventListener("click", (event) => {
    
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":

            if(triggerRefresh == 1){ // checking if operate() has been called
                restoreData();
                triggerRefresh = 0;
            }

            updateDisplay(event.target.textContent);
            storedValues += event.target.textContent; // concat the content of the current button into storedValues string
            break;

        case "operator-btn":              
            triggerRefresh = 0; 
            updateDisplay(event.target.textContent);
            storedValues += " " + event.target.textContent + " "; 
            break;

        case "equal-btn":
            operate();
            break;

        case "clear-btn":
            restoreData();
            break;
       }
    }



})

// Updates the disppay
function updateDisplay(){

  display.textContent = storedValues;  

}

function storeValue (value) {

    storedValues += value;
    updateDisplay();
    
}

function  deleteValue () {

    storedValues.pop();
    updateDisplay();

}

//Clears everything
function restoreData() {

    display.textContent = "";
    storedValues = "";

}

function validateKey(input) {

    if(input === ','){
        return '.';
    }else if(input === 'x'){
        return '*';
    }else{
        return input;
    }

}

function operateArray (array,result) { 

    array.splice(0,3);   // takes storedValues and a operation function as arguments, then modify storedValues 
    array.unshift(result.toString());

    return;

}

// takes the storedValues string and splits it into an array, separating numbers and operators
function organizeData () {

    let operators = {'+':'|+|','-':'|-|','*':'|*|','/':'|/|'};

    storedValues = storedValues.replace(/[+\-\*\/]/g, op => operators[op]);

    return storedValues.split('|');

}

function operate () {

let finalDataArray = organizeData();

console.log(finalDataArray);

while(finalDataArray.length>1){

    switch(finalDataArray[1]){
        case '+':
            operateArray(finalDataArray,+finalDataArray[0] + +finalDataArray[2]);
        break;

        case '-':
            operateArray(finalDataArray,+finalDataArray[0] - +finalDataArray[2]);          
        break;

        case '*':
            operateArray(finalDataArray,+finalDataArray[0] * +finalDataArray[2]);          
        break;

        case '/':
            operateArray(finalDataArray,+finalDataArray[0] / +finalDataArray[2]);         
        break;
    }

    storedValues = finalDataArray.toString();
    updateDisplay();
    triggerRefresh = true;
       
};



    return ;

}










