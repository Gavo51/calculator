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

            if(triggerRefresh == true){ 
                restoreData();
                triggerRefresh = false;
            }

            storeValue(event.target.textContent)
            updateDisplay();
            blockOperator = false;
            
            break;

        case "operator-btn":   

            triggerRefresh = false;

            if(!blockOperator) {
            storeValue(event.target.textContent); 
            blockOperator = true;
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

function reduceData (array,result) { 

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

        case '*':
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










