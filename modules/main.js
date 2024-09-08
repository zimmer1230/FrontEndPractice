import dada from "./lib.js";
import hello, {brian} from "./lib.js";
/*addEventListener('DOMContentLoaded', (event)=>{
    document.querySelector('h1').innerHTML += hello();
});*/

document.querySelector('h1').innerHTML += dada.x + dada.y;
brian.speak();
