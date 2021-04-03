// import compiler from "./compiler/index.js";
import { globalWrite, } from "./utils/globalWR.js";

export default function render(fEl, elWrap){
  let elem = fEl; 
  
  globalWrite('elems.root', elWrap);
  
  elWrap.appendChild(elem);
} 



