let man=new Object();
man.age = 18;
man.talk=function(){
    console.log("Hello");
    console.log("My age is");
    console.log(this.age);
}

let Jason={age: 32, name: "Jason", talk: function(){console.log(this.name)}};