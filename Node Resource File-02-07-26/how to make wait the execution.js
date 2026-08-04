//sync code run then return settimeout value
// console.log('hey');
// setTimeout(()=>{
//     console.log('wait, 3000')
// },3000)
// console.log('Hey1')


// made it wait
async function makeitwait() {
    console.log('hey');
    await new Promise(resolve => {
        setTimeout(() => {
            console.log('wait 3000')
            resolve();
        }, 3000)
    })
    console.log('Hey1')
}

makeitwait();
