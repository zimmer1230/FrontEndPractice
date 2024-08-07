const hello = ()=>{
    let msg = "better than brian!";
    console.log(msg);
    return msg;
};
const brian = {height: '168cm', style: 'roast?', speak: ()=>{console.log('Better than hello');}};
export default {obj1:hello, obj2:brian};
