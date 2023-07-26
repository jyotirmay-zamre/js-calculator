const buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');
const outButtons = document.querySelectorAll('.span-two');
var run
var postfix =''
const inStack = []
const postStack = []
var result = 0
var flag

function preced(o) {
    switch(o) {
        case '÷':
            return 3;
        case '*':
            return 2;
        case '+' || '-':
            return 1;
        default:
            return -1;
    }
}

function stackLoop(j) {
    postfix = postfix + ' ' + inStack[j];
    inStack.pop()
}

/*Loops through the stack after entire infix expression is scanned or when a lower (compared to others in the stack) precedence operator is scanned */
function argCreate(len, text, i, run) {
    j = len
    if (run == true) {
        while(j >= 0 && preced(inStack[j]) >= preced(text[i])) {
            stackLoop(j)
            j -= 1
        }
    } else {
        while(j>=0) {
            stackLoop(j)
            j -= 1
        }
    }
}

/*Converts an input infix expression to postfix */
function postfixConv(text) {
    for (let i = 0; i < text.length; i++) {
        if (isNaN(text[i]) == false) {
            if (i == 0) {
                postfix += text[i];
            } else {
                postfix = postfix + ' ' + text[i];
            }
        } else {
            if (inStack.length == 0 || preced(text[i]) > preced(inStack.slice(-1))) {
                inStack.push(text[i])
            } else {
                argCreate(inStack.length - 1, text, i, true);
                inStack.push(text[i]);
                }
            }
        }
    argCreate(inStack.length - 1, text, 0, false);
    return postfix;
    }

/*Evaluates an input postfix expression */
function postfixEval(statement) {
    for (let i = 0; i < statement.length; i++) {
        if (isNaN(statement[i]) == false) {
            postStack.push(statement[i]);
        } else {
            num2 = Number(postStack.slice(-1))
            postStack.pop()
            num1 = Number(postStack.slice(-1))
            postStack.pop()
            switch(statement[i]) {
                case '÷':
                    postStack.push(num1 / num2);
                    break;
                case '*':
                    postStack.push(num1 * num2);
                    break;
                case '+':
                    postStack.push(num1 + num2);
                    break;
                case '-':
                    postStack.push(num1 - num2);
                    break;
            }
        }
    }
    result = postStack[0]
    postStack.pop()
    return result
}

/*Click events for buttons not including AC and = */
buttons.forEach(elem => {
    elem.addEventListener('click', function handleClick() {
        if (elem.innerHTML == 'DEL') {
            display.value = (display.value.slice(0, -1) + '');
        } else if (elem.classList.contains('oper')) {
            run = true;
            display.value += ' ' + elem.innerHTML;
        } else {
            if (run == true) {
                display.value += ' ' + elem.innerHTML;
                run = false;
            } else {
                display.value += elem.innerHTML;
            }
        }
    });
});

/*Click events for AC and = */
outButtons.forEach(i => {
    i.addEventListener('click', function event() {
        if (i.innerHTML == 'AC') {
            display.value = '';
            postfix = '';
            result = 0
        } else {
            text = display.value.split(' ');
            display.value = (postfixEval(postfixConv(text).split(' ')));
            flag = true;
        }
    });
});


