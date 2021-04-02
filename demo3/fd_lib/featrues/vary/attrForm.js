
import { isVary, } from "./Vary.js";
export function varyAttrInputValue(fNode, varyVal){
  if (!isVary(varyVal)) { return varyVal; }
  
  let inputVal = varyVal.get(false);
  varyVal.$add_set(({ nxtTrimedValue })=>{
    fNode.realNode.value = nxtTrimedValue;
  })
  fNode.realNode.addEventListener("input",(evt)=>{
    let value = evt.currentTarget.value; 
    varyVal.set((pre_v)=>{
      return value;
    })
  })
  return inputVal;
} 



