
import {
  isVaryValue,
} from "../../utils/judge.js";


export function varyAttrStyleStr(fNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let str = varyAttr.get(false);
  console.log('# todo');
} 
export function varyAttrStyleObj(fNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let obj = varyAttr.get(false);
  
  console.log('# todo');
} 
export function varyAttrStyleOval(fNode, styKey, varyAttrVal ){
  if (!isVaryValue(varyAttrVal)) { return varyAttrVal; }
  
  let elem = fNode.realNode;
  let value = varyAttrVal.get(false);
  elem.style[styKey] = value;
  varyAttrVal._mounted_run( value );
  varyAttrVal._add_set(({ nxtTrimedValue })=>{
    elem.style[styKey] = nxtTrimedValue;
  })
  return value;
} 

