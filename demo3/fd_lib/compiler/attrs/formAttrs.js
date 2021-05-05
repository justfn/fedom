/* 处理表单元素 
*/

import {
  varyAttrInputValue, 
} from "../../featrues/varyValue/attrForm.js";

export function isFormNode(fNode){
  let nodeName = fNode.realNode.nodeName ?? '';
  nodeName = nodeName.toLowerCase();
  return ['input'].includes(nodeName);
};
export function addFormAttrs(fNode, key, val){
  if (fNode.realNode.nodeName.toLowerCase()!=='input') { 
    console.log('not input node');
    return ; 
  }   
  
  if (key==='value') {
    inputValueAttr(fNode, key, val);
    return ;
  }
  
  if (key==='placeholder') {
    inputPlaceholderAttr(fNode, key, val);
    return ;
  }
  
} 
// 处理 input value 
export function inputValueAttr(fNode, key, val ){
  
  let inputVal = val;
  
  /* Features: 
  */
  inputVal = varyAttrInputValue(fNode, val);
  
  fNode.realNode.setAttribute("value",inputVal)
} 
// 处理 input placeholder 
export function inputPlaceholderAttr(fNode, key, val ){
  
  let inputVal = val;
  
  /* Features: 
  */
  // inputVal = xxx(fNode, val);
  
  fNode.realNode.setAttribute("placeholder", inputVal)
} 


