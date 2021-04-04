
import message from "../../config/message.js";
import trimTextChild from "../../compiler/child/trimTextChild.js";
import { 
  isStringValue, 
  isNumberValue, 
  isNodeValue, 
  isArrayValue, 
  isTextChild, 
} from "../../utils/judge.js";


/* 子节点可变 
*/
export default function childValVary(pNode, child, varyChild, patchNode ){
  if (!varyChild) { return ; }
  
  /* ** 补偿更新Node节点  
  1 设置文本字符串作为子节点时,初始渲染后,第二次更新无法通过文本定位该文本节点 
  需在首次渲染后,将文本节点进行补偿替换 
  2 空数组子节点首次渲染时,将无实体节点插入,使用注释节点占位,该注释节点作为补偿节点存储 
  */
  let patch_node = patchNode; // 缓存补偿的节点 
  varyChild.mounted_run(child);
  varyChild.add_set(({ preTrimedValue, nxtTrimedValue })=>{
    let pre_val = patch_node || preTrimedValue;
    if ( isNodeValue(pre_val) ) {
      patch_node = updateNode(pre_val.parentNode, nxtTrimedValue, pre_val, null).patchNode;
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
        patch_node = updateNode(pNode, nxtTrimedValue, flgCommentNode, null).patchNode;
      }
      // to_do 空数组处理 
      else { patch_node = updateNode(pNode, nxtTrimedValue, patchNode, null).patchNode; }
    }
    else {
      console.log('### to_do: childVary');
      console.log('patch_node', patch_node);
      console.log('preTrimedValue', preTrimedValue);
      console.log('pNode', pNode);
      console.log('child', child);
    }
    
    return { };
  })
} 

function updateNode(parentNode, childNode, flgNode, beforeNode){
  let patchNode = null;
  
  if ( isTextChild(childNode) ) {
    childNode = document.createTextNode( trimTextChild(childNode) );
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
