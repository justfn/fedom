
import { isVary, } from "./Vary.js";
export function attrInputValue(fNode, varyVal){
  if (!isVary(varyVal)) { return varyVal; }
  
  let inputVal = varyVal.get(false);
  varyVal.$add_set((p_v,n_v)=>{
    fNode.realNode.value = n_v;
    return [n_v];
  })
  fNode.realNode.addEventListener("input",(evt)=>{
    let value = evt.currentTarget.value; 
    varyVal.set((pre_v)=>{
      return value;
    })
  })
  return inputVal;
} 



