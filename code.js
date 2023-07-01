const button_num = document.querySelectorAll("button.button_num");
const math = document.getElementById("math");
const answer = document.getElementById("answer");
const button_op = document.querySelectorAll("button.button_op");
var mathexp = "";
const clear = document.querySelector("#clear");
const compute = document.querySelector("#compute");
const del = document.querySelector("#del");
const button_dot = document.querySelector("#dot")
var dot_array = []


function no_display(screen){
    return screen.trim() == "";
}

function check_op(ele){
    return ele == '+' || ele == '-' || ele == '*' || ele == '/';
}

button_num.forEach(btn => {
    let num = btn.getAttribute('id');
    btn.addEventListener("click", function(){
        math.style.fontSize = "150%"
        if (no_display(answer.innerHTML)){
            math.innerHTML += num;
            mathexp += num;
            dot_array.push(0);
        } else {
            math.innerHTML = num;
            mathexp = num;
            // resets if a new number is pressed after computing
            answer.innerHTML = "";
        } 
    });
});

button_op.forEach(btn => {
    btn.addEventListener("click", function(){
        let op_id = btn.getAttribute("id");
        // do not allow user to add operation if there is no number
        if (no_display(math.innerHTML)){
            return;
        }
        // do not allow user to add two consective operation
        if (check_op(mathexp.slice(-1))){
            return;
        }

        // use case switch here as button_op = +, -, /, * and %
        switch (op_id){
            case '%':
                // when answer is not computed, will add on to the exp
                if (no_display(answer.innerHTML)){
                    math.innerHTML += btn.innerHTML;
                    mathexp += '/100';
                // if answer is already computed, it will add operation to the number
                } else {
                    mathexp = answer.innerHTML + '/100';
                    math.innerHTML = answer.innerHTML + btn.innerHTML;
                    answer.innerHTML = "";
                }
                break;

            default: 
                // when answer is not computed, will add on to the exp
                if (no_display(answer.innerHTML)){
                    math.innerHTML += btn.innerHTML;
                    mathexp += op_id;
                // if answer is already computed, it will add operation to the number
                } else {
                    mathexp = answer.innerHTML + op_id;
                    math.innerHTML = answer.innerHTML + btn.innerHTML;
                    answer.innerHTML = "";
                }
        }
    });
});

clear.addEventListener("click", function(){
    math.innerHTML = "";
    mathexp = "";
    answer.innerHTML = "";
    dot_array = [];
});

del.addEventListener("click", function(){
    let last_ele = math.innerHTML.slice(-1);
    math.innerHTML = math.innerHTML.slice(0, -1);
    mathexp = mathexp.slice(0, -1);

    // account when deleting a dot
    if (last_ele == '.'){
        dot_array.pop();
        dot_array.push(0);
    }
    // account when deleting and operation is left at the end after deletion +, -, *, /
    if (check_op(mathexp.slice(-1))){
        dot_array.pop();
    }
    // account when deleting %
    if (last_ele == '%'){
        mathexp = mathexp.slice(0, -3);
    }

});

compute.addEventListener("click", function(){
    let ans_temp = eval(mathexp).toString();
    ans_temp = (ans_temp.length > 13) ? ans_temp.slice(0, 12) : ans_temp;
    answer.innerHTML = ans_temp;
    answer.style.fontSize = "150%";
    mathexp = "";
    math.style.fontSize = "100%";
}); 


button_dot.addEventListener("click", function(){
    let last_ele = dot_array.pop();
    if (last_ele == 1){
        dot_array.push(1);
        return;
    }

    // case when no number is displayed or last ele is operation; result = 0.
    if (no_display(math.innerHTML) || check_op(mathexp.slice(-1))){
        math.innerHTML += '0.';
        mathexp += '0.';
        dot_array.push(1);
    }
    // case when number is already displayed; result = 9.
    else {
        math.innerHTML += '.';
        mathexp += '.';
        dot_array.push(1);
    }
});

 