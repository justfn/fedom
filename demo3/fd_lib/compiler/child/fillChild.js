/* 填充子节点 
*/

import message from "../../message.js";

import { 
  nodeChild, 
  textChild, 
} from "./typedChild.js";
import { isVary, } from "../../featrues/vary/Vary.js";
import varyChildString from "../../featrues/vary/childString.js";
import varyChildNode from "../../featrues/vary/childNode.js";
import varyChildArray from "../../featrues/vary/childArray.js";

export default function fillChildren(fNode){
  fNode.children.forEach(child=>{
    if (child===undefined || child===null) { return ; }
  
    // 处理字符串子节点：去掉空格&忽略空字符串 
    if (typeof child === 'string' ) { 
      child = child.trim(); 
      if (child.length===0) { return ; }
    }
    if (fNode.nodeType!=='tag') { child = '' }
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
  /* brance: arr */
  if (child instanceof Array) { 
    child.forEach((cldItm,idx)=>{
      fillChild(fNode, cldItm, null);
    })
    
    /* ** Features: 
    */
    varyChildArray(fNode, child, varyChild, fillChild);
    
    return ;
  }
  
  /* Result: undefind null */
  if (child === undefined || child === null) {
    let txtNode = textChild(fNode, '');
    
    /* ** Features: 
    */
    varyChildString(txtNode, '', varyChild);
    
    return;
  }
  /* Result: text */
  if (typeof child === 'string' || typeof child === 'number' ) {
    child += '';
    let txtNode = textChild(fNode, child);
    
    /* ** Features: 
    */
    varyChildString(txtNode, child, varyChild)
    
    return ;
  }
  /* Result: node */
  if (child instanceof Node) { 
    nodeChild(fNode, child, varyChild);
    
    /* ** Features: 
    */
    varyChildNode( fNode, varyChild );
    
    return ;
  }
  /* Result: other */
  console.warn('# todo child', realNode, child);
  fillChild(fNode, child.toString(), null);
}


