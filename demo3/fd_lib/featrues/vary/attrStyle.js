
import { isVary, } from "./Vary.js";


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
  if (!isVary(varyAttrVal)) { return varyAttrVal; }
  
  let elem = fNode.realNode;
  let value = varyAttrVal.get(false);
  elem.style[styKey] = value;
  varyAttrVal.$mounted_run( value );
  varyAttrVal.$add_set(({ nxtTrimedValue })=>{
    elem.style[styKey] = nxtTrimedValue;
  })
  return value;
} 

