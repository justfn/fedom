/* 填充子节点 
*/
import config from "../../config/config.js";

// import childValVary from "../../featrues/varyValue/childVary.js";
import { 
  fillNodeChild, 
  fillTextChild, 
  markListStart, 
} from "./childUtil.js";
import { 
  isVaryValue, 
  isStringValue, 
  isNumberValue, 
  isArrayValue, 
  isNodeValue, 
  isEmptyValue,  
  isTextValue,  
  isCommentNode,  
  isFDComponent, 
} from "../../utils/judge.js";
import {
  errLog, 
} from "../../utils/dev.js";
import render from "../render.js";


export default function fillChildren(fNode){
  // console.log("000000000 fillChildren", fNode)
  let {
    realNode, 
    children, 
  } = fNode; 
  // 注释节点: 不处理子节点 
  if (isCommentNode(realNode)) { return; }
  // 无子节点:  
  if ( fNode.children.length===0 ) { return; }
  // 组件子节点由用户控制插入 
  if ( isFDComponent(fNode.tagName) ) { return ; }
  
  // 处理子节点 
  render(children, realNode);
  
  // children.forEach(child=>{ fillChild(fNode, child, null); })
} 

// export function fillChild( fNode, child, varyChild ) {
//   /* brance: vary */
//   if ( isVaryValue(child) ) { return fillChild(fNode, child.get(false), child); }
//   /* brance: arr */
//   if ( isArrayValue(child) ) { 
//     // 数组子节点,标记起始位置,便于后续更新
//     let arrPathcNode = null; 
//     if (varyChild) { arrPathcNode = markListStart(fNode.realNode); }
//     child.forEach((cldItm,idx)=>{ fillChild(fNode, cldItm, null); })
//     childValVary({
//       fNode, 
//       child, 
//       varyChild, 
//       arrPathcNode,
//     });
//     return ;
//   }
// 
//   /* 出口1: node child*/
//   if ( isNodeValue(child) ) { 
//     fillNodeChild(fNode.realNode, child);
//     childValVary({
//       fNode, 
//       child, 
//       varyChild, 
//     });
//     return ;
//   }
//   /* 出口2: text child */
//   if ( isTextValue(child) ) { 
//     let textPatchNode = fillTextChild(fNode.realNode, child);
//     childValVary({
//       fNode, 
//       child, 
//       varyChild, 
//       textPatchNode,
//     });
//     return ;
//   }
// }


