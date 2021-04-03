
import message from "../../message.js";
import { isStringValue, isNumberValue, isNodeValue, isArrayValue, } from "../../utils/judge.js";

/* 子节点可变 
*/
export default function childValVary(pNode, child, varyChild, patchNode ){
  if (!varyChild) { return ; }
  
  varyChild.$patch(patchNode);
  varyChild.$mounted_run(child);
  varyChild.$add_set(({ preTrimedValue, nxtTrimedValue, patchValue })=>{
    let patch_val = null;
    let pre_val = patchValue || preTrimedValue;
    if ( isNodeValue(pre_val) ) {
      patch_val = updateNode(pre_val.parentNode, nxtTrimedValue, pre_val, null).patchNode;
    }
    else if ( isArrayValue(pre_val) ) {
      if ( pre_val.length > 0 ) {
        let pNode = pre_val[0].parentNode;
        let flgCommentNode = document.createComment("fedom array children removed")
        // to_do 待优化: 移除旧元素  
        pre_val.forEach((itm,idx)=>{
          if (idx===0) { pNode.replaceChild(flgCommentNode,itm) }
          else { pNode.removeChild(itm); }
        })
        patch_val = updateNode(pNode, nxtTrimedValue, flgCommentNode, null).patchNode;
      }
      // to_do 空数组处理 
      else { patch_val = updateNode(pNode, nxtTrimedValue, patchNode, null).patchNode; }
    }
    else {
      console.log('### to_do: childVary');
      console.log(patchValue);
      console.log(preTrimedValue);
      console.log(child);
      console.log(pNode);
    }
    
    return {
      patch_value: patch_val,
    };
  })
} 

function updateNode(parentNode, childNode, flgNode, beforeNode){
  let patchNode = null;
  if ( childNode===undefined || childNode===null ) { childNode = '' }
  
  if ( isStringValue(childNode) || isNumberValue(childNode) ) {
    childNode = childNode + '';
    childNode = document.createTextNode(childNode);
    patchNode = childNode;
    insertNode(parentNode, childNode, flgNode, beforeNode);
  }
  else if ( isNodeValue(childNode) ) {
    insertNode(parentNode, childNode, flgNode, beforeNode);
  }
  else if ( isArrayValue(childNode) ) {
    let preChid = null;
    if (childNode.length===0) {
      patchNode = document.createComment("fedom: empty array child for position");
      insertNode(parentNode, patchNode, flgNode, beforeNode);
    }
    else {
      childNode.forEach((itm,idx)=>{
        if ( isArrayValue(itm) ) { throw message.errors.mutil_vary_array_child; }
        
        if (idx===0) { preChid = updateNode(parentNode, itm, flgNode, null).childNode; }
        else { preChid = updateNode(parentNode, itm, null, preChid).childNode; }
      })
    }
  }
  else {
    console.log('### to_do: updateNode undefined child type');
  }
  
  return {
    patchNode,
    childNode: patchNode || childNode,
  };
} 
function insertNode(parentNode, childNode, replaceNode, beforeNode){
  if (replaceNode) { parentNode.replaceChild(childNode, replaceNode); }
  else if (beforeNode) { parentNode.insertBefore(childNode, beforeNode.nextSibling); }
  else { console.error('## updateNode error') }
} 
