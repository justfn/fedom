/* 处理表单元素 
*/

import {
  varyAttrInputValue, 
} from "../../featrues/VaryAction/varyFormAttrs.js";

export function isFormNode(fdNode){
  let nodeName = fdNode.realNode.nodeName ?? '';
  nodeName = nodeName.toLowerCase();
  return ['input'].includes(nodeName);
};
export function addFormAttrs(fdNode, key, val){
  if (fdNode.realNode.nodeName.toLowerCase()!=='input') { 
    console.log('not input node');
    return ; 
  }   
  
  if (key==='value') {
    inputValueAttr(fdNode, key, val);
    return ;
  }
  
  if (key==='placeholder') {
    inputPlaceholderAttr(fdNode, key, val);
    return ;
  }
  
} 
// 处理 input value 
export function inputValueAttr(fdNode, key, val ){
  
  let inputVal = val;
  
  /* Features: 
  */
  inputVal = varyAttrInputValue(fdNode, val);
  
  fdNode.realNode.setAttribute("value",inputVal)
} 
// 处理 input placeholder 
export function inputPlaceholderAttr(fdNode, key, val ){
  
  let inputVal = val;
  
  /* Features: 
  */
  // inputVal = xxx(fdNode, val);
  
  fdNode.realNode.setAttribute("placeholder", inputVal)
} 


