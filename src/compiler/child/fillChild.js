/* 填充子节点 
*/
// import childValVary from "../../featrues/VaryAction/varyChildContent.js";
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
  isClassValue, 
} from "../../utils/judge.js";
import render from "../render.js";


export default function fillChildren(fdNode){
  // console.log("000000000 fillChildren", fdNode)
  let {
    realNode, 
    children, 
  } = fdNode; 
  // 注释节点: 不处理子节点 
  if (isCommentNode(realNode)) { return; }
  // 无子节点:  
  if ( fdNode.children.length===0 ) { return; }
  // 组件子节点由用户控制插入 
  if ( isClassValue(fdNode.tagName) ) { return ; }
  
  // 处理子节点 
  render(children, realNode);
  
  // children.forEach(child=>{ fillChild(fdNode, child, null); })
} 

// export function fillChild( fdNode, child, varyChild ) {
//   /* brance: vary */
//   if ( isVaryValue(child) ) { return fillChild(fdNode, child.get(false), child); }
//   /* brance: arr */
//   if ( isArrayValue(child) ) { 
//     // 数组子节点,标记起始位置,便于后续更新
//     let patchNodeForList = null; 
//     if (varyChild) { patchNodeForList = markListStart(fdNode.realNode); }
//     child.forEach((cldItm,idx)=>{ fillChild(fdNode, cldItm, null); })
//     childValVary({
//       fdNode, 
//       child, 
//       varyChild, 
//       patchNodeForList,
//     });
//     return ;
//   }
// 
//   /* 出口1: node child*/
//   if ( isNodeValue(child) ) { 
//     fillNodeChild(fdNode.realNode, child);
//     childValVary({
//       fdNode, 
//       child, 
//       varyChild, 
//     });
//     return ;
//   }
//   /* 出口2: text child */
//   if ( isTextValue(child) ) { 
//     let patchNodeForText = fillTextChild(fdNode.realNode, child);
//     childValVary({
//       fdNode, 
//       child, 
//       varyChild, 
//       patchNodeForText,
//     });
//     return ;
//   }
// }


