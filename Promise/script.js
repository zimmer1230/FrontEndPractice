let success = null;




function exe(){
    success = Number(document.getElementById('promise_value').value);
    let P = new Promise( (resolve, reject)=>{
        if (success){
            resolve();
        }
        else {
            reject();
        }
    } );
    P.then( ()=>{console.log("Resolved.")} )
    .catch( ()=>{console.log("Failed.")} )
};

