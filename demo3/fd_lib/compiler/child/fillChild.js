import { isVary, } from "../../featrues/vary/Vary.js";

import { 
  nodeChild, 
  textChild, 
} from "./typedChild.js";
import vary_str from "../../featrues/vary/childString.js";
import vary_nod from "../../featrues/vary/childNode.js";
import vary_arr from "../../featrues/vary/childArray.js";

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
    fillChild(fNode, child.get(false), child); 
    return ;
  }
  /* brance: arr */
  if (child instanceof Array) { 
    child.forEach((cldItm,idx)=>{
      fillChild(fNode, cldItm, null);
    })
    if (varyChild) { vary_arr(fNode, child, varyChild, fillChild); }
    return ;
  }
  
  /* Result: undefind null */
  if (child === undefined || child === null) {
    let txtNode = textChild(realNode, '');
    if (varyChild) { vary_str(txtNode, '', varyChild) }
    return;
  }
  /* Result: text */
  if (typeof child === 'string' || typeof child === 'number' ) {
    child += '';
    let txtNode = textChild(realNode, child);
    if (varyChild) { vary_str(txtNode, child, varyChild) }
    return ;
  }
  /* Result: node */
  if (child instanceof Node) { 
    nodeChild(realNode, child, varyChild);
    if (varyChild) { vary_nod( realNode, varyChild ); }
    return ;
  }
  /* Result: other */
  console.warn('# todo child', realNode, child);
  fillChild(fNode, child.toString(), null);
}


