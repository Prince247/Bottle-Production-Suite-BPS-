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