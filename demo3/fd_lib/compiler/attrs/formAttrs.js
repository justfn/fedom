/* 处理表单元素 
*/

import {
  varyAttrInputValue, 
} from "../../featrues/vary/attrForm.js";

export function isFormNode(fNode){
  let nodeName = fNode.realNode.nodeName ?? '';
  nodeName = nodeName.toLowerCase();
  return ['input'].includes(nodeName);
};
export function addFormAttrs(fNode, key, val){
  if (fNode.realNode.nodeName.toLowerCase()!=='input' || key!=='value') { return ; }   
  
  inputValueAttr(fNode,key,val);
} 
// 处理 input value 
export function inputValueAttr(fNode, key, val ){
  
  let inputVal = val;
  
  /* Features: 
  */
  inputVal = varyAttrInputValue(fNode, val);
  
  fNode.realNode.setAttribute("value",inputVal)
} 


