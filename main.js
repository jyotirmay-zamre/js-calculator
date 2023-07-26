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
        case '+':
            return 1;
        case '-':
            return 1;
    }
}

function stackLoop() {
    postfix += ' ' + inStack.slice(-1);
    inStack.pop()
}

/*Loops through the stack after entire infix expression is scanned or when a lower (compared to others in the stack) precedence operator is scanned */
function argCreate(len, i, run) {
    j = len
    if (run) {
        while(j >= 0 && preced(inStack[j]) >= preced(i)) {
            stackLoop()
            j -= 1
        }
    } else {
        while(j >= 0) {
            stackLoop()
            j -= 1
        }
    }
}

/*Converts an input infix expression to postfix */
function postfixConv(text) {
    start = 0
    for (i of text) {
        len = inStack.length
        if (!isNaN(i)) {
            if (start == 0) {
                postfix += i;
            } else {
                postfix += ' ' + i;
            }
        } else {
            if (len == 0 || preced(i) > preced(inStack.slice(-1))) {
                inStack.push(i)
            } else {
                argCreate(len - 1, i, true);
                inStack.push(i);
                }
            }
        start = 1;
        }
    argCreate(inStack.length - 1, 0, false);
    return postfix;
    }

/*Evaluates an input postfix expression */
function postfixEval(statement) {
    for (i of statement) {
        if (!isNaN(i)) {
            postStack.push(i);
        } else {
            num2 = Number(postStack.slice(-1))
            postStack.pop()
            num1 = Number(postStack.slice(-1))
            postStack.pop()
            switch(i) {
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
            if (run) {
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
            console.log(text)
            display.value = (postfixEval(postfixConv(text).split(' ')));
            flag = true;
        }
    });
});


