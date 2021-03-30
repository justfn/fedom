
import message from "../../message.js";
import { isComponent, } from "../Component.js";
import addAttrs from "../../compiler/attrs/addAttrs.js";


export default function varyTagName(fNode){
  let varyTag = fNode.varyTag;
  if (!varyTag) { return ; }
  
  let {
    realNode, 
    attrs, 
    props, 
  } = fNode;
  let pNode = realNode.parentNode;
  let pre_node = realNode; 
  let pre_node_removed = null;
  let pre_node_style_display = pre_node.style.display;
  let nxt_node = null;
  varyTag.$add_set((p_v, n_v)=>{
    pNode = pNode ?? pre_node.parentNode;
    /* ** 根据设置的不同值 
    true   显示当前元素 
    false  隐藏元素 
    null   删除元素 
    */
    
    // Features: 设值为true/false 显示/隐藏该节点 
    if (typeof n_v === 'boolean') {
      let display = n_v ? pre_node_style_display : 'none';
      pre_node.style.display = display; 
      return [pre_node];
    }
    
    // Features: null 删除该节点 
    if (n_v===null) {
      nxt_node = document.createComment("fedom vary tag and remove")
      pre_node_removed = pre_node;
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return [nxt_node];
    }
    
    // Features: 替换为html节点  
    if (typeof n_v === 'string') {
      nxt_node = document.createElement(n_v);
      addAttrs(fNode);
      // to_do: 待优化 
      Array.prototype.forEach.call( [...pre_node.childNodes], (itm)=>{
        nxt_node.appendChild(itm);
      })
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return [n_v, pNode];
    }
    
    // Features: 替换为组件 
    if (isComponent(n_v)) {
      let inst = new n_v(props);
      nxt_node = inst.render(props);
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return [n_v, pNode];
    }
    if (typeof n_v === 'function') {
      nxt_node = n_v(props, fNode.context)
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return [n_v, pNode];
    }
    
    throw message.errors.unsuport_vary_tag;
  })
} 


