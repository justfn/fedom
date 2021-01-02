// import compiler from "./compiler/index.js";

export default function render(fEl,elWrap){
  let el = fEl; 
  if (typeof fEl === 'function') { el = fEl(); }
  
  // const el = compiler(fEl);
  elWrap.appendChild(el);
} 



