/* 填充子节点 
*/
import config from "../../config/config.js";
import message from "../../config/message.js";

import childValVary from "../../featrues/varyValue/childVary.js";
import trimTextChild from "./trimTextChild.js";
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
  isTextChild,  
  isCommentNode,  
} from "../../utils/judge.js";


export default function fillChildren(fNode){
  if (isCommentNode(fNode.realNode)) { return ; }
  
  fNode.children.forEach(child=>{
    if ( isTextChild(child) ) { child = trimTextChild(child); }
    
    fillChild(fNode, child, null);
  })
} 

export function fillChild( fNode, child, varyChild ) {
  // 组件子节点由用户控制插入 
  if ( fNode.nodeType!==config.tag_types.origin ) { return ; }
  
  /* brance: vary */
  if ( isVary(child) ) { 
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
  /* Result: text child */
  else if ( isTextChild(child) ) {
    child = trimTextChild(child);
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


