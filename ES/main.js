const fn = (n)=> { 
    return new Promise( (res, rej) => setTimeout( ()=>res(n*n), 1000)); 
};

const fn2 = async(n)=>{
    await new Promise( (res, rej)=>{ setTimeout( ()=>{res()}, 2000 )} );
    return n*n;
};

const fn3 = async (n) => { 
    await new Promise(res => setTimeout(res, 2000)); 
    return n * n; 
}