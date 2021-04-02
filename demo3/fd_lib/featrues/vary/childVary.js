
import message from "../../message.js";

/* 子节点可变 
*/
export default function childValVary(pNode, child, varyChild, patchNode ){
  if (!varyChild) { return ; }
  
  let cNode = child;
  // if (child instanceof Array) { }
  // if (child instanceof Node) { }
  // if (child===undefined || child===null) { child = ''; }
  // if (typeof child==='string' || typeof child==='number') { child = child + ''; }
  
  varyChild.$patch(patchNode);
  varyChild.$mounted_run(child);
  varyChild.$add_set(({ preTrimedValue, nxtTrimedValue, patchValue })=>{
    let patch_val = null;
    let pre_val = patchValue || preTrimedValue;
    if (pre_val instanceof Node) {
      patch_val = updateNode(pre_val.parentNode, nxtTrimedValue, pre_val, null).patchNode;
    }
    else if (pre_val instanceof Array ) {
      // to_do 空数组处理 
      if ( pre_val.length > 0 ) {
        let pNode = pre_val[0].parentNode;
        let flgCommentNode = document.createComment("fedom array children removed")
        // to_do 待优化: 移除旧元素  
        pre_val.forEach((itm,idx)=>{
          if (idx===0) { pNode.replaceChild(flgCommentNode,itm) }
          else { pNode.removeChild(itm); }
        })
        patch_val = updateNode(pNode, nxtTrimedValue, flgCommentNode, null);
      }
      else { patch_val = updateNode(pNode, nxtTrimedValue, patchNode, null); }
    }
    else {
      console.log('### todo', pNode, child);
    }
    
    return {
      patch_value: patch_val,
    };
  })
} 

function updateNode(parentNode, childNode, flgNode, beforeNode){
  let patchNode = null;
  if ( childNode===undefined || childNode===null ) { childNode = '' }
  
  if (typeof childNode==='string') {
    childNode = document.createTextNode(childNode);
    patchNode = childNode;
    insertNode(parentNode, childNode, flgNode, beforeNode);
  }
  else if (childNode instanceof Node) {
    insertNode(parentNode, childNode, flgNode, beforeNode);
  }
  else if (childNode instanceof Array) {
    let preChid = null;
    if (childNode.length===0) {
      patchNode = document.createComment("fedom: empty array child for position");
      insertNode(parentNode, patchNode, flgNode, beforeNode);
    }
    else {
      childNode.forEach((itm,idx)=>{
        if (itm instanceof Array) { throw message.errors.mutil_vary_array_child; }
        
        if (idx===0) { preChid = updateNode(parentNode, itm, flgNode, null).childNode; }
        else { preChid = updateNode(parentNode, itm, null, preChid); }
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
