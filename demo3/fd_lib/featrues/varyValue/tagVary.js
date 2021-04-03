
import message from "../../config/message.js";
import addAttrs from "../../compiler/attrs/addAttrs.js";
import { 
  isComponent, 
  isBooleanValue, 
  isStringValue, 
  isFunctionValue, 
} from "../../utils/judge.js";


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
  varyTag.$add_set(({nxtTrimedValue})=>{
    pNode = pNode ?? pre_node.parentNode;
    /* ** 根据设置的不同值 
    true   显示当前元素 
    false  隐藏元素 
    null   删除元素 
    */
    
    // Features: 设值为true/false 显示/隐藏该节点 
    if ( isBooleanValue(nxtTrimedValue) ) {
      let display = nxtTrimedValue ? pre_node_style_display : 'none';
      pre_node.style.display = display; 
      return {
        next_value: pre_node,
      };
    }
    
    // Features: null 删除该节点 
    if (nxtTrimedValue===null) {
      nxt_node = document.createComment("fedom vary tag and remove")
      pre_node_removed = pre_node;
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return {
        next_value: nxt_node,
      };
    }
    
    // Features: 替换为html节点  
    if ( isStringValue(nxtTrimedValue) ) {
      nxt_node = document.createElement(nxtTrimedValue);
      addAttrs(fNode);
      // to_do: 待优化 
      Array.prototype.forEach.call( [...pre_node.childNodes], (itm)=>{
        nxt_node.appendChild(itm);
      })
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return {
        next_value: nxtTrimedValue,
        parent_node: pNode,
      };
    }
    
    // Features: 替换为组件 
    if (isComponent(nxtTrimedValue)) {
      let inst = new nxtTrimedValue(props);
      nxt_node = inst.render(props);
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      
      return {
        next_value: nxtTrimedValue,
        parent_node: pNode,
      };
    }
    if ( isFunctionValue(nxtTrimedValue) ) {
      nxt_node = nxtTrimedValue(props, fNode.context)
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return {
        next_value: nxtTrimedValue,
        parent_node: pNode,
      };
    }
    
    console.warn( nxtTrimedValue );
    throw message.errors.unsuport_vary_tag;
  })
} 


