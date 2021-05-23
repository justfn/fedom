
import {
  isVaryValue,
} from "../../utils/judge.js";


export function varyAttrInputValue(fNode, varyVal){
  if (!isVaryValue(varyVal)) { return varyVal; }
  
  let inputVal = varyVal.get(false);
  varyVal._add_set(({ nxtTrimedValue })=>{
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



