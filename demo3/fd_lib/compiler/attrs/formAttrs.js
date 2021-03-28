/* 处理表单元素 
*/

import {
  attrInputValue, 
} from "../../featrues/vary/attrForm.js";

export function isFormNode(fNode){
  let node = fNode.realNode;
  let nodeName = node.nodeName ?? '';
  nodeName = nodeName.toLowerCase();
  return ['input'].includes(nodeName);
};
export function addFormAttrs(fNode, key, val){
  let elem = fNode.realNode;
  if (elem.nodeName.toLowerCase()==='input' && key==='value') { 
    inputValueAttr(fNode,key,val);
  }   
} 
// 处理 input value 
export function inputValueAttr(fNode, key, val ){
  let elem = fNode.realNode;
  
  let inputVal = val;
  /* Features: */
  inputVal = attrInputValue(fNode, val);
  elem.setAttribute("value",inputVal)
} 


