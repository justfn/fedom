

import { useVary, } from "../libs/index.js";

export default function(elem){
  let x = useVary(0);
  let y = useVary(0);
  
  elem.addEventListener("mousemove",function(evt){
    // console.log(evt);
    x.value = evt.clientX; 
    y.value = evt.clientY; 
  })
  
  return {
    x,
    y,
  };
}