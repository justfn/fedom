
import {
  isVaryValue,
} from "../../utils/judge.js";


export function varyAttrStyleStr(fdNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let str = varyAttr.get(false);
  console.log('# todo');
} 
export function varyAttrStyleObj(fdNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let obj = varyAttr.get(false);
  
  console.log('# todo');
} 
export function varyAttrStyleOval(fdNode, styKey, varyAttrVal ){
  if (!isVaryValue(varyAttrVal)) { return varyAttrVal; }
  
  let elem = fdNode.realNode;
  let value = varyAttrVal.get(false);
  elem.style[styKey] = value;
  varyAttrVal._mounted_run( value );
  varyAttrVal._add_set(({ nxtTrimedValue })=>{
    elem.style[styKey] = nxtTrimedValue;
  })
  return value;
} 

