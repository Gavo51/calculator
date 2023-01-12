const btnContainer = document.querySelector(".btn-container");
const display = document.querySelector(".display");

let storedValues = "";

let triggerRefresh = false;         // flag variable to check the screen should be refreshed after certain events
let disableDecimals = false;        // flag variable to block decimals under certain conditions


window.addEventListener("keydown",function(event) {

let userInput = event.key;

    if (userInput >= 0 || userInput <= 9){       
        if (triggerRefresh) {
            clearData();
        }  
        storeValue(userInput);       
    } else if ('.,'.includes(userInput)){       
        if (triggerRefresh) {
            clearData();
        }
        if (!disableDecimals){      
            if(!storedValues || operatorCheck()){
                storeValue('0.');
            } else {
                storeValue('.');  
            }
            disableDecimals = true;      
        }
    } else if ('+-/*'.includes(userInput)){
        triggerRefresh = false;
        disableDecimals = false;
        if (!!storedValues && !operatorCheck()) {        
            if (userInput == '*'){
                storeValue('x');
            } else {
            storeValue(userInput); 
            }       
        }      
    } else if (userInput === 'Enter'){
        operate();   
    } else if (userInput === 'Backspace') {    
        deleteValue();
    }

});


/*Add click event  listener for all buttons the container*/
btnContainer.addEventListener("mousedown", (event) => {

console.log(event.target.classList);
   
    for(let buttonType of event.target.classList){
        
       switch(buttonType){

        case "digit-btn":
            if(triggerRefresh == true){ 
                clearData();
                triggerRefresh = false;
            }
            storeValue(event.target.textContent);           
            break;
        case "operator-btn":   
            triggerRefresh = false;
            disableDecimals = false;
            if(!!storedValues && !operatorCheck()) {
                storeValue(event.target.textContent);                
            } 
            break;
        case "period-btn":
            if(triggerRefresh){ 
                clearData();
                triggerRefresh = false;
            }  
            if(!disableDecimals){           
                if(!storedValues || operatorCheck()){
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
            clearData();
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
    return;
}

function deleteValue () {
    if(storedValues[storedValues.length-1] == '.'){
        disableDecimals = false;
    }
    storedValues = storedValues.slice(0,storedValues.length-1);
    triggerRefresh = false;   
    updateDisplay();
}

//Clears everything
function clearData() {
    display.textContent = "";
    storedValues = "";
    triggerRefresh = false;  
    disableDecimals = false;  

}

function operatorCheck(){
    if('+-/*'.includes(storedValues[storedValues.length-1])){
        return true;
    } else {
        return false;
    }
}

// takes storedValues and a operation function as arguments, then modify storedValues 
function operateData (array,result) { 
  
    array.splice(0,3); 
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
    if(storedValues.includes('.')) disableDecimals = true; 
    updateDisplay();
    triggerRefresh = true;
       
};

return ;

}










