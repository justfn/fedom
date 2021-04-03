/* 填充子节点 
*/
import config from "../../config.js";
import message from "../../message.js";

import { isStringValue, isNumberValue, isArrayValue, isNodeValue,  } from "../../utils/judge.js";
import { 
  nodeChild, 
  textChild, 
} from "./typedChild.js";
import { isVary, } from "../../featrues/vary/Vary.js";

// to_do: 待合并为 childValVary 
import childValVary from "../../featrues/vary/childVary.js";

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
    return ;
  }
  
  /* Result: undefind | null | text */
  if (child === undefined || child === null) { child = ''; }
  if ( isStringValue(child) || isNumberValue(child) ) {
    child += '';
    patchNode = textChild(fNode, child);
    return ;
  }
  /* Result: node */
  if ( isNodeValue(child) ) { 
    nodeChild(fNode, child);
    return ;
  }
  /* Result: other */
  fillChild(fNode, child.toString(), null);
  console.warn('################################ todo child', realNode, child);
  
  /* ** Features: 
  */
  childValVary(fNode, child, varyChild, patchNode);
}


