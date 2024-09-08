const hello = ()=>{
    let msg = "better than brian!";
    console.log(msg);
    return msg;
};
const brian = {height: '168cm', style: 'roast?', speak: ()=>{console.log('Better than hello');}};
let x=5;
let y=8;
export default {x, y};
export {brian};