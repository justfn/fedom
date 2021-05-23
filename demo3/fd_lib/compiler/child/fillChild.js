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
  isVaryValue, 
  isStringValue, 
  isNumberValue, 
  isArrayValue, 
  isNodeValue, 
  isEmptyValue,  
  isTextValue,  
  isCommentNode,  
} from "../../utils/judge.js";


export default function fillChildren(fNode){
  // 注释节点 
  if (isCommentNode(fNode.realNode)) { return; fd_dev_log('fedom: 注释节点不处理子节点', fNode); }
  
  // 无子节点 
  if ( fNode.children.length===0 ) { return; fd_dev_log('fedom: 无子节点', fNode); }
  
  // 处理子节点 
  fNode.children.forEach(child=>{
    if ( isTextValue(child) ) { child = trimTextChild(child); }
    
    fillChild(fNode, child, null);
  })
} 

export function fillChild( fNode, child, varyChild ) {
  // 组件子节点由用户控制插入 
  if ( fNode.nodeType!==config.tag_types.origin ) { return ; }
  
  /* brance: vary */
  if ( isVaryValue(child) ) { 
    if (varyChild) { throw message.errors.mutil_vary; };
    
    fillChild(fNode, child.get(false), child); 
    return ;
  }
  
  
  // console.log('P:  ', fNode.realNode);
  // console.log('C:  ', child);
  let textPatchNode = null;
  let arrPathcNode = null; 
  /* brance: arr */
  if ( isArrayValue(child) ) { 
    // 数组子节点,标记起始位置,便于后续更新
    arrPathcNode = document.createComment("fedom: start of array child for position");
    nodeChild(fNode, arrPathcNode);
    if (child.length>0) {
      child.forEach((cldItm,idx)=>{
        fillChild(fNode, cldItm, null);
      })
    }
  }
  /* Result: text child */
  else if ( isTextValue(child) ) {
    child = trimTextChild(child);
    textPatchNode = textChild(fNode, child);
  }
  /* Result: node */
  else if ( isNodeValue(child) ) { 
    nodeChild(fNode, child);
  }
  /* Result: other 默认按照字符串处理 */
  else {
    child = trimTextChild(child+'');
    textPatchNode = textChild(fNode, child);
  }
  
  /* ** Features: 
  */
  childValVary({
    fNode, 
    child, 
    varyChild, 
    textPatchNode,
    arrPathcNode,
  });
}


