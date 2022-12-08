
function add(){

let numbers = Array.from(arguments);
let total = 0;

    numbers.forEach(num => {
        total += num;
    });

    return total;
}

function subtract(){

let numbers = Array.from(arguments);
let total = numbers[0];

    for(let i=1;i<numbers.length;i++){
        total -= numbers[i];
    }

    return total;
}

function multiply(){

let numbers = Array.from(arguments);
let total = numbers[0];

    for(let i=1;i<numbers.length;i++){
        total *= numbers[i];
    }

    return total;
}

function divide(){

let numbers = Array.from(arguments);
let total = numbers[0];

    for(let i=1;i<numbers.length;i++){
        total /= numbers[i];
    }

    return total;
}

console.log(divide(8,3,2))



