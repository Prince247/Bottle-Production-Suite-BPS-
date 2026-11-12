let arr = [1,1,0,12,12,12]
let count = 1;
let max = 0;
let value;

for(let i=0;i<arr.length;i++){
    if(arr[i]==arr[i+1]){
        count++
    }else if(arr[i]!=arr[i+1]){
        count=1
    }
    if(count>max){
        max=count;
        value=arr[i]
    }
}
console.log(max);
console.log(value);