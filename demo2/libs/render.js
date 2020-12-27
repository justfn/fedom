import compiler from "./compiler/index.js";

export default function render(fEl,elWrap){
  const el = compiler(fEl);
  elWrap.appendChild(el);
} 



