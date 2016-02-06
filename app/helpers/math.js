import Ember from 'ember';

export  function math(operand1, operator, operand2) {

    var result;

    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
    }

    return result;
}

export default Ember.Helper.helper(math);
