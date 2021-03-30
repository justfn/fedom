// import compiler from "./compiler/index.js";
import {globalWrite} from "./utils/globalWR.js";

export default function render(fEl, elWrap){
  let elem = fEl; 
  // if (typeof fEl === 'function') { elem = fEl(); }
  
  globalWrite('elems.root', elWrap);
  
  // const elem = compiler(fEl);
  elWrap.appendChild(elem);
} 



