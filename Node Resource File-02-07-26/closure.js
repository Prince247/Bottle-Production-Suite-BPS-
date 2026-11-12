// Refer this only ---- Closures are used for data privacy, Where an inner function remembers and has access to variables from its outer function scope even after the outer function has finished execution.

/*
function accounts(){
    let bal = 0;
    function creditsAdded(adds){
        bal = bal + adds;
        return bal;
    }
    function getBal(){
        return bal;
    }
    return {creditsAdded,getBal};
}

let check = accounts();
console.log(check.creditsAdded(102)); // 102
check.creditsAdded(103); // 206
console.log(check.getBal()); // 206
*/

/* Example with and without closure
1. Without closure (public access)
let bal = 0;

bal = 100;
console.log(bal); // 100
bal = 500;        // Anyone can modify it

2. With closure (private access)
function accounts() {
    let bal = 0;

    function creditsAdded(adds) {
        bal += adds;
        return bal;
    }
    function getBalance() {
        return bal;
    }

    return {creditsAdded,getBalance };
}

let check = accounts();

check.creditsAdded(100);
console.log(check.getBalance()); // 100
console.log(check.bal); // undefined

****Please Check Below for above defination pros of closure**************

1. bal cannot be accessed directly from outside.
2. The inner functions can access and modify bal.
3. Outside code can only interact with bal through the methods you expose.
4. You control what operations are allowed.

bonus - Closure doesn't make the variable inaccessible to everyone. It keeps the variable private from outside code while allowing the inner functions to access it.
That's how closures provide data privacy in JavaScript.

*/
