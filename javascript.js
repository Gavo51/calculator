const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");

let storedValues = "";

let triggerRefresh = false;         // flag variable to check the screen should be refreshed after certain events
let disableDecimals = false;        // flag variable to block decimals under certain conditions


window.addEventListener("keydown",function(event) {

let userInput = event.key;

    if(userInput >= 0 || userInput <= 9){
        
        // checking if operate() has been called
        if(triggerRefresh){ 
            restoreData();
            triggerRefresh = false;
        }
 
        storeValue(userInput);       

    } else if ('.,'.includes(userInput)){
        
        if(triggerRefresh){ 
            restoreData();
            triggerRefresh = false;
        }

        if(!disableDecimals){
       
            if(!storedValues || checkPreviousVal() == 'operator'){
                storeValue('0.');
            } else {
                storeValue('.');  
            }
            disableDecimals = true;        
        }

    } else if ('+-/*'.includes(userInput)){

        triggerRefresh = false;

        if(!!storedValues && checkPreviousVal() != 'operator') {
        //Avoid operator inputs if there are no numbers or an operator has been introduced already
            
            if(userInput == '*'){
                storeValue('x');
            } else {
            storeValue(userInput); 
            }
            disableDecimals = false;

        }      

    } else if(userInput === 'Enter'){
        operate();  
     
    } else if(userInput === 'Backspace') {
        deleteValue();
    }

});


/*Add click event  listener for all buttons the container*/
btnContainer.addEventListener("mousedown", (event) => {
   
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":

            if(triggerRefresh == true){ 
                restoreData();
                triggerRefresh = false;
            }

            storeValue(event.target.textContent);
            updateDisplay();
            
            break;

        case "operator-btn":   

            triggerRefresh = false;

            if(!!storedValues && checkPreviousVal() != 'operator') {
                storeValue(event.target.textContent); 
                disableDecimals = false;
            } 

            break;

        case "period-btn":

            if(triggerRefresh){ 
                restoreData();
                triggerRefresh = false;
            }
    
            if(!disableDecimals){
           
                if(!storedValues || checkPreviousVal() == 'operator'){
                    storeValue('0.');
                } else {
                    storeValue('.');  
                }
    
                disableDecimals = true;        
   
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

// Updates the display
function updateDisplay(){

  display.textContent = storedValues;  

}

function storeValue (value) {

    storedValues += value;
    updateDisplay();
    
}

function deleteValue () {

    storedValues = storedValues.slice(0,storedValues.length-1);
    triggerRefresh = false;
    
    updateDisplay();

}

//Clears everything
function restoreData() {

    display.textContent = "";
    storedValues = "";
    triggerRefresh = false;  
    disableDecimals = false;  

}

function checkPreviousVal(){

    if('+-/*'.includes(storedValues[storedValues.length-1])){
        return 'operator';
    } else {
        return 'number';
    }

}


function operateData (array,result) { 

    array.splice(0,3);   // takes storedValues and a operation function as arguments, then modify storedValues 
    result = Math.round(result * 100) / 100;
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
            operateData(finalData,+finalData[0] + +finalData[2]);
        break;

        case '-':
            operateData(finalData,+finalData[0] - +finalData[2]);          
        break;

        case 'x':
            operateData(finalData,+finalData[0] * +finalData[2]);          
        break;

        case '/':
            operateData(finalData,+finalData[0] / +finalData[2]);         
        break;
    }

    storedValues = finalData.toString();   
    updateDisplay();
    triggerRefresh = true;
    

    console.log('result '+ finalData);
       
};



    return ;

}










