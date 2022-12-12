const digitBtns = document.querySelectorAll(".digit-btn");
const display = document.querySelector(".display");
const btnContainer = document.querySelector(".btn-container");

/*Add event listener for all buttons the container*/

btnContainer.addEventListener("click", (event) => {
    
    for(let button of event.target.classList){
        
       switch(button){

        case "digit-btn":
            updateDisplay(event);
            break;
        
      
       }
     

        

    }



})



/*digitBtns.forEach(button => { button.addEventListener("click",updateDisplay)
    
});*/

function updateDisplay(e){

    if(display.textContent==="0"){
        display.textContent="";
    }
  display.textContent += e.target.textContent;
  

}

/* BASIC MATH FUNCTIONS */

function add(numbers){

let total = 0;

    numbers.forEach(num => {
        total += num;
    });

    return total;
}

function subtract(numbers){

let total = numbers[0];

    for(let i=1;i<numbers.length;i++){
        total -= numbers[i];
    }

    return total;
}

function multiply(numbers){

let total = numbers[0];

    for(let i=1;i<numbers.length;i++){
        total *= numbers[i];
    }

    return total;
}

function divide(numbers){

let total = numbers[0];

    for(let i=1;i<numbers.length;i++){
        total /= numbers[i];
    }

    return total;
}

function operate (operator,...numbers) {

    let result = 0;

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

    return result;

}

console.log(operate('+',6,2,2));



