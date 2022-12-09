
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



