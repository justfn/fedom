

import addAttrs from "../../compiler/attrs/addAttrs.js";



export default function tagString(fNode){
  let varyTag = fNode.varyTag;
  if (!varyTag) { return ; }
  
  let {
    realNode,
    attrs, 
  } = fNode;
  let pNode = realNode.parentNode;
  let pre_node = realNode; 
  let nxt_node = null;
  varyTag.$add_set((p_v, n_v, atrs)=>{
    // Feature_more: 设值为false的值,则直接删除该节点 
    pNode = pNode ?? pre_node.parentNode;
    if (!n_v) {
      pNode.removeChild(pre_node);
      return [n_v];
    }
    
    // console.log( pNode );
    nxt_node = document.createElement(n_v);
    addAttrs(fNode);
    Array.prototype.forEach.call( [...pre_node.childNodes], (itm)=>{
      nxt_node.appendChild(itm);
    })
    pNode.replaceChild(nxt_node, pre_node);
    pre_node = nxt_node;
    return [n_v, pNode];
  }, attrs)


} 


