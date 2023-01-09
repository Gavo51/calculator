const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");


let storedValues = "";
let operatorList = "+-*/";


let triggerRefresh = false;         // flag variable to check if operate() has been called
let disableOperators = false;       // flag variable to check if an operator has been inputted

/*Add event listener for userInputboard inputs*/

window.addEventListener("keydown",function(event) {

let userInput = event.key;

    if(userInput >= 0 || userInput <= 9){
        
        // checking if operate() has been called
        if(triggerRefresh){ 
            restoreData();
            triggerRefresh = false;
        }
 
        storeValue(userInput);       
        disableOperators = false;        
    }

    if(userInput == '.' || userInput == ','){
        
        if(triggerRefresh){ 
            restoreData();
            triggerRefresh = false;
        }

        if(storedValues == ''){
            storeValue('0.');
        } else {
            storeValue('.');  
        }
        
        disableOperators = false;        
    }

    if('+-/*'.includes(userInput)){

        triggerRefresh = false;

         // check if an operator userInput has been pressed twice
        if(!disableOperators) {

            if(userInput == '*'){
                storeValue('x');
            } else {
            storeValue(userInput); 
            }

        disableOperators = true;

        }       
    }

    if(userInput === 'Enter'){
        operate();
    } 

    if(userInput === 'Backspace') {
        deleteValue();
    }



});


/*Add click event  listener for all buttons the container*/
btnContainer.addEventListener("click", (event) => {

let userInput="";
    
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":

            if(triggerRefresh == true){ 
                restoreData();
                triggerRefresh = false;
            }

            userInput = event.target.textContent;
            storeValue(userInput);
            updateDisplay();
            disableOperators = false;
            
            break;

        case "operator-btn":   

            userInput = validateuserInput(event.target.textContent);
            triggerRefresh = false;

            if(!disableOperators) {
                storeValue(userInput); 
                disableOperators = true;
            } 

            break;

        case "equal-btn":

            operate();
            break;

        case "clear-btn":

            restoreData();
            break;
        
        case "delete-btn":

            deleteValue();
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

function deleteValue () {

    storedValues = storedValues.slice(0,storedValues.length-1);
    updateDisplay();

}

//Clears everything
function restoreData() {

    display.textContent = "";
    storedValues = "";

}

function replaceMultiplier(input) {

    if(input === '*'){
        return 'x';
    }else{
        return input;
    }

}

function reduceData (array,result) { 

    array.splice(0,3);   // takes storedValues and a operation function as arguments, then modify storedValues 
    array.unshift(result.toString());

    return;

}

// takes the storedValues string and splits it into an array, separating numbers and operators
function organizeData () {

    let operators = {'+':'|+|','-':'|-|','x':'|x|','/':'|/|'};

    storedValues = storedValues.replace(/[+\-\x\/]/g, op => operators[op]);

    return storedValues.split('|');

}

function operate () {

// Array that contains all the data with separated numbers and operators
let finalData = organizeData();

console.log(finalData);

while(finalData.length>1){

    switch(finalData[1]){
        case '+':
            reduceData(finalData,+finalData[0] + +finalData[2]);
        break;

        case '-':
            reduceData(finalData,+finalData[0] - +finalData[2]);          
        break;

        case 'x':
            reduceData(finalData,+finalData[0] * +finalData[2]);          
        break;

        case '/':
            reduceData(finalData,+finalData[0] / +finalData[2]);         
        break;
    }

    storedValues = finalData.toString();
    updateDisplay();
    triggerRefresh = true;
       
};



    return ;

}










