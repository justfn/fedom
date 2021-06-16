
import { 
  fillNodeChild, 
  fillTextChild, 
  markListStart, 
} from "./child/childUtil.js";
import { 
  isVaryValue,
  isArrayValue,
  isFNode, 
  isNodeValue,
  isTextValue,
} from "../utils/judge.js";
import {
  warnLog, 
} from "../utils/dev.js";
import childValVary from "../featrues/varyValue/childVary.js";

/* ** 渲染内容 
*/
const msg_todo_render = '未预期的render调用'; 
function fillChildIntoParent( varydOrListOrFNodeOrNodeOrText, nodeWrap, fNodeChild, varyChild ){
  // 渲染 vary value
  if ( isVaryValue(varydOrListOrFNodeOrNodeOrText) ) {
    let listOrFNodeOrNodeOrText = varydOrListOrFNodeOrNodeOrText.get(false);
    return fillChildIntoParent(listOrFNodeOrNodeOrText, nodeWrap, fNodeChild, varydOrListOrFNodeOrNodeOrText);
  }
  // 渲染list 
  if ( isArrayValue(varydOrListOrFNodeOrNodeOrText) ) {
    varydOrListOrFNodeOrNodeOrText.forEach((fNodeOrNodeOrText,idx)=>{ 
      fillChildIntoParent(fNodeOrNodeOrText, nodeWrap, fNodeChild, varyChild); 
    })
    // 数组子节点,标记起始位置,便于后续更新
    let arrPathcNode = null; 
    if (varyChild) { arrPathcNode = markListStart(fNode.realNode); }
    childValVary({
      // fNode, 
      varyChild, 
      arrPathcNode,
      textPatchNode: null, 
    });
    return varydOrListOrFNodeOrNodeOrText;
  }
  // 渲染fNode 
  if ( isFNode(varydOrListOrFNodeOrNodeOrText) ) {
    let listOrNodeOrText = varydOrListOrFNodeOrNodeOrText.realNode; 
    return fillChildIntoParent(listOrNodeOrText, nodeWrap, varydOrListOrFNodeOrNodeOrText, varyChild);
  }
  
  // 出口1: 渲染节点 
  if ( isNodeValue(varydOrListOrFNodeOrNodeOrText) ) {
    fillNodeChild(nodeWrap, varydOrListOrFNodeOrNodeOrText);
    childValVary({
      // fNode, 
      varyChild, 
      arrPathcNode: null,
      textPatchNode: null, 
    });
    return fNodeChild || varydOrListOrFNodeOrNodeOrText;
  }
  // 出口2: 渲染文本 
  if ( isTextValue(varydOrListOrFNodeOrNodeOrText) ) {
    let textPatchNode = fillTextChild(nodeWrap, varydOrListOrFNodeOrNodeOrText); 
    childValVary({
      // fNode, 
      varyChild, 
      textPatchNode, 
      arrPathcNode: null,
    });
    return fNodeChild || textPatchNode;
  }
  // 
  warnLog(msg_todo_render);
} 
export default function render(varydOrListOrFNodeOrNodeOrText, nodeWrap){
  // console.log("000000000 varydOrListOrFNodeOrNodeOrText ", varydOrListOrFNodeOrNodeOrText, nodeWrap )
  return fillChildIntoParent(varydOrListOrFNodeOrNodeOrText, nodeWrap, null, null);
} 



