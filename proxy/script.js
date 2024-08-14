let profile = {first_name: 'yihua', last_name: 'chen'};

let profile_proxy = new Proxy(
    profile, {
        get: (target, property)=>{
            if(property=='chinese_name'){
                return target.last_name+' '+target.first_name;
            }
            else{
                return target[property];
            }
        }
    }
);


let good = {
    apple: 100,
    banana: 25,
    coco: 36
};

let fruits = new Proxy(good,
    {
        get: (fruit, property)=>{
        if(property=='total'){
            return fruit.apple+fruit.banana+fruit.coco;
        }
        else{
            return fruit.property;
        }
        }
    }

)