
import {
  warnLog, 
} from "../utils/dev.js";
import { 
  isVaryValue,
  isArrayValue,
  isFdNode, 
  isNodeValue,
  isTextValue,
  isEmptyValue,
} from "../utils/judge.js";
import { 
  fillNodeChild, 
  fillTextChild, 
  markListStart, 
} from "./child/childUtil.js";
import varyChildValue from "../featrues/VaryAction/varyChildContent.js";

/* ** 渲染内容 
*/
const msg_todo_render = '未预期的render调用'; 
function fillChildIntoParent( varydOrListOrFdNodeOrNodeOrText, nodeWrap, fdNodeChild, varyChild ){
  // 渲染 vary value
  if ( isVaryValue(varydOrListOrFdNodeOrNodeOrText) ) {
    let listOrFdNodeOrNodeOrText = varydOrListOrFdNodeOrNodeOrText.get(false);
    return fillChildIntoParent(listOrFdNodeOrNodeOrText, nodeWrap, fdNodeChild, varydOrListOrFdNodeOrNodeOrText);
  }
  // 渲染list 
  if ( isArrayValue(varydOrListOrFdNodeOrNodeOrText) ) {
    // 数组子节点,标记起始位置,便于后续更新
    let patchNodeForList = null; 
    if (varyChild) { patchNodeForList = markListStart(nodeWrap); }
    varyChildValue({
      // fdNode, 
      varyChild, 
      patchNodeForList,
      patchNodeForText: null, 
    });
    
    varydOrListOrFdNodeOrNodeOrText.forEach((fdNodeOrNodeOrText,idx)=>{ 
      fillChildIntoParent(fdNodeOrNodeOrText, nodeWrap, fdNodeChild, varyChild); 
    })
    return varydOrListOrFdNodeOrNodeOrText;
  }
  // 渲染fdNode 
  if ( isFdNode(varydOrListOrFdNodeOrNodeOrText) ) {
    let listOrNodeOrText = varydOrListOrFdNodeOrNodeOrText.realNode; 
    return fillChildIntoParent(listOrNodeOrText, nodeWrap, varydOrListOrFdNodeOrNodeOrText, varyChild);
  }
  
  // 出口1: 渲染节点 
  if ( isNodeValue(varydOrListOrFdNodeOrNodeOrText) ) {
    fillNodeChild(nodeWrap, varydOrListOrFdNodeOrNodeOrText);
    varyChildValue({
      // fdNode, 
      varyChild, 
      patchNodeForList: null,
      patchNodeForText: null, 
    });
    return fdNodeChild || varydOrListOrFdNodeOrNodeOrText;
  }
  // 出口2: 渲染文本 
  if ( isEmptyValue(varydOrListOrFdNodeOrNodeOrText) ) { varydOrListOrFdNodeOrNodeOrText = '' }
  varydOrListOrFdNodeOrNodeOrText = varydOrListOrFdNodeOrNodeOrText + ''; 
  let patchNodeForText = fillTextChild(nodeWrap, varydOrListOrFdNodeOrNodeOrText); 
  varyChildValue({
    // fdNode, 
    varyChild, 
    patchNodeForText, 
    patchNodeForList: null,
  });
  return fdNodeChild || patchNodeForText;
} 
export default function render(varydOrListOrFdNodeOrNodeOrText, nodeWrap){
  // console.log("000000000 varydOrListOrFdNodeOrNodeOrText ", varydOrListOrFdNodeOrNodeOrText, nodeWrap )
  return fillChildIntoParent(varydOrListOrFdNodeOrNodeOrText, nodeWrap, null, null);
} 



