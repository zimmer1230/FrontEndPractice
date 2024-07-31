function getData(){
    fetch("https://cwpeng.github.io/live-records-samples/data/products.json").then( (response)=>{
        console.log(response);
        return response.json();
    } ).then( (data)=>{
        document.getElementById('result').innerHTML = '';
        for (let i=0; i<data.length; i++){
            document.getElementById('result').innerHTML += '<div>' + data[i].name + '</div>';
        }
    } )

}