/* 填充子节点 
*/
import config from "../../config/config.js";
import message from "../../config/message.js";

import { 
  nodeChild, 
  textChild, 
} from "./typedChild.js";
import { 
  isVary, 
  isStringValue, 
  isNumberValue, 
  isArrayValue, 
  isNodeValue, 
  isEmptyValue,  
} from "../../utils/judge.js";

// to_do: 待合并为 childValVary 
import childValVary from "../../featrues/varyValue/childVary.js";

export default function fillChildren(fNode){
  fNode.children.forEach(child=>{
    if (child===undefined || child===null) { return ; }
  
    // 处理字符串子节点：去掉空格&忽略空字符串 
    if ( isStringValue(child) ) { 
      child = child.trim(); 
      if (child.length===0) { return ; }
    }
    if (fNode.nodeType!==config.tag_types.origin) { child = '' }
    fillChild(fNode, child, null);
  })
} 

export function fillChild( fNode, child, varyChild ) {
  let realNode = fNode.realNode;
  
  /* brance: vary */
  if (isVary(child)) { 
    if (varyChild) { throw message.errors.mutil_vary; };
    
    fillChild(fNode, child.get(false), child); 
    return ;
  }
  
  // console.log('P:  ', fNode.realNode);
  // console.log('C:  ', child);
  let patchNode = null;
  /* brance: arr */
  if ( isArrayValue(child) ) { 
    if (child.length===0) {
      patchNode = document.createComment("fedom: empty array child for position");
      fNode.appendChild(patchNode);
    }
    else {
      child.forEach((cldItm,idx)=>{
        fillChild(fNode, cldItm, null);
      })
    }
  }
  /* Result: undefind | null | text */
  else if ( isEmptyValue(child) ) { 
    patchNode = textChild(fNode, '');
  }
  else if ( isStringValue(child) || isNumberValue(child) ) {
    child += '';
    patchNode = textChild(fNode, child);
  }
  /* Result: node */
  else if ( isNodeValue(child) ) { 
    nodeChild(fNode, child);
  }
  /* Result: other */
  else {
    fillChild(fNode, child.toString(), null);
    console.warn('################################ todo child', child);
  }
  
  /* ** Features: 
  */
  childValVary(fNode, child, varyChild, patchNode);
}


