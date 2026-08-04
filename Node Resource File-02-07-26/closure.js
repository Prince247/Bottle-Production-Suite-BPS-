// what is closure? looks like Function inside function + remembers outer variable ✅ Closure

// Closure is a JS feature where an inner function remembers and has access to variables from its outer function scope
// even after the outer function has finished execution. Closures are used for data privacy,

//Closure
/*
function withdraw(){
    let balance = 100;
    return function txntc(){
        balance -=10;
        return balance
    }
    
}
let txn = withdraw();
console.log(txn());
console.log(txn());
*/


//Normal Func
//balance is a global variable. withdraw() updates the global balance and returns the updated value.
// The returned value is stored in transaction. Printing transaction twice only prints the same stored value twice.
// It does not call withdraw() again.

/*let balance=100;
function withdraw (){
    balance -=10;
    return balance;
};
let transaction = withdraw();
console.log(transaction); //90
console.log(transaction); //90
*/

