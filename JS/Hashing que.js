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