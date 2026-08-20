//use fetch or axios for calling from thrid party api question need to solve EG
//1. Count frequency of each element using hashing
/* Brute Force
let hashNum = [10,1,2,10,2,1,15];
let results = {};
for(let i=0;i<hashNum.length;i++){
    let count=0;
    for(let j=0;j<hashNum.length;j++){
        if(hashNum[i]==hashNum[j]){
            count++;
        }
        results[hashNum[i]]=count
    }
}
console.log(results);
*/

/* Optimal
let hashNum = [10,1,2,10,2,1,15];
let hashKey ={}

for(let i of hashNum){
    hashKey[i] = (hashKey[i] || 0) + 1;
}
console.log(hashKey);
*/

/* 2. Find Duplicate using Hashing
let hashNum = [10,1,2,10,2,1,15];
let fetchDetails={}

for(let i of hashNum){
    fetchDetails[i] = (fetchDetails[i] || 0) + 1
    if(fetchDetails[i]>1){
        console.log(i);
        break;
    }
}
console.log(fetchDetails);
*/

/* 3. Find the highest and lowest frequency element. how many which number a appered maximum
let hashNum = [10,2,10,2,10,15];
let result ={};
let max = -Infinity;
let min = Infinity;
let maximum;
let minimum;
for(let i of hashNum){
    result[i]=(result[i] || 0) + 1
}

for(let i in result){
    if(result[i]>max){
        max=result[i];
        maximum=i
    }
    if(result[i]<min){
        min=result[i];
        minimum=i
    }
}

console.log('maximum ' + maximum);
console.log('minimum ' + minimum);
*/

/* 4. Palidrom
let value = 'RACECAR';
let check = value.toLowerCase();
let rev = check.split("").reverse().join("");

if(rev != check){
    console.log('Not An Palnidrom')
}else{
    console.log('is An Palnidrom')
}
*/
/*
let pairsHaspMap = { "(": ")", "{": "}", "[": "]" };
function stacks(values) {
    let stack = [];
    let isValid = true;
    for (let i of values) {
        let char = i;
        if (pairsHaspMap[char]) {
            stack.push(char)
        } else if (pairsHaspMap[stack.pop()] != char) {
            isValid = false;
            console.log('Value ' + char);
            break
        }
    }
    if (stack.length != 0) {
        isValid = false
    }
    return isValid
}

console.log(stacks("()[{}()]")); // true
console.log(stacks("([)]"));     // false
console.log(stacks("(((")); 
*/

/* Remove duplicate number
//1.
let numbers = [1,2,3,4,5,6,7,9,2];
let results= [...new Set(numbers)]
console.log(results);

//1.1
let numbers = [1,2,3,4,5,6,7,9,2];
let result=[];

for(let i of numbers){
    if(!result.includes(i)){
        result.push(i)
    }
}
console.log(result);

//2. Check has duplicate
let numbers = [1,2,3,4,5,6,7,9,2];
let results= new Set();
for(let i of numbers){
    if(results.has(i)){
        console.log('i ' + i)
        break;
    }
    results.add(i);
}

//2.2

let hashNum = [10,1,2,10,2,1,15];
let fetchDetails={}

for(let i of hashNum){
    fetchDetails[i] = (fetchDetails[i] || 0) + 1
    if(fetchDetails[i]>1){
        console.log(i);
        break;
    }
}
console.log(fetchDetails);

//2.3
let numbers = [1,2,3,4,5,6,7,9,2];
let result={};
let hasDuplicate = false;

for(let i of numbers){
    if(result[i]){
        console.log(i)
        hasDuplicate=true;
        break
    }else{
        result[i]=true
    }
}
console.log(hasDuplicate);



*/