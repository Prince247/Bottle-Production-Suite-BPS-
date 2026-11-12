setTimeout(()=>{
    console.log('Heyy!!')
},0);

setImmediate(()=>{
    console.log('Immeditae')
});

setInterval(() => {
    console.log('100')
}, 100);