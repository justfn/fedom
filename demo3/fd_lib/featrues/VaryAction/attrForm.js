
import {
  isVaryValue,
} from "../../utils/judge.js";


export function varyAttrInputValue(fdNode, varyVal){
  if (!isVaryValue(varyVal)) { return varyVal; }
  
  let inputVal = varyVal.get(false);
  varyVal._add_set(({ nxtTrimedValue })=>{
    fdNode.realNode.value = nxtTrimedValue;
  })
  fdNode.realNode.addEventListener("input",(evt)=>{
    let value = evt.currentTarget.value; 
    varyVal.set((pre_v)=>{
      return value;
    })
  })
  return inputVal;
} 



