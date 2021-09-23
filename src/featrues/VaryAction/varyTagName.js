
import createFdNode from "../../compiler/fdNode/fdNode.js";
import bindAttrs from "../../compiler/attrs/bindAttrs.js";
import fillChildren from "../../compiler/child/fillChild.js";
import updateCpnt from "../../featrues/Component/updateCpnt.js";
import { runCpntRemove, } from "../../featrues/Lifecycles/onUnmount.js";
import componentAttrs from "../../compiler/attrs/attrsCpnt.js";
import { 
  isBooleanValue, 
  isStringValue, 
  isFDComponent, 
  isEmptyValue, 
} from "../../utils/judge.js";


/* ** Features: 标签名动态化
注意 变量名需大写否则jsx不处理  
*/
const err_msg01 = 'unsuport vary tag'
export default function varyTagName(fdNode){
  let varyTag = fdNode.varyTag;
  if (!varyTag) { return ; }
  // return ;
  
  
  let {
    realNode, 
    attrs, 
    props, 
    children, 
  } = fdNode;
  let pNode = realNode.parentNode;
  let pre_node = realNode; 
  let pre_node_removed = null;
  // let pre_node_style_display = 'auto';
  // if (pre_node.style) { pre_node_style_display = pre_node.style.display; };
  let nxt_node = null;
  varyTag._add_set( ({nxtTrimedValue})=>{
    pNode = pNode ?? pre_node.parentNode;
    /* ** 根据设置的不同值 
    true   显示当前元素 
    false  隐藏元素 
    null   删除元素 
    */
    
    // Features: 设值为true 回显原节点内容 
    if ( nxtTrimedValue===true ) {
      pNode.replaceChild(pre_node_removed, pre_node);
      pre_node = pre_node_removed;
      return ;
    }
    
    // Features: null 删除该节点 
    if ( isEmptyValue(nxtTrimedValue) ) {
      runCpntRemove(fdNode.context); 
      updateCpnt(fdNode, null, null);
      nxt_node = document.createComment("fedom vary tag and remove")
      pre_node_removed = pre_node;
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      return ;
      // {
      //   next_value: nxt_node,
      // };
    }
    
    // Features: 替换为html节点  
    if ( isStringValue(nxtTrimedValue) ) {
      runCpntRemove(fdNode.context); 
      updateCpnt(fdNode, null, null);
      
      let newFdNode = createFdNode({
        varyTag: null, 
        tagName: nxtTrimedValue,
        attrs, 
        children,
      });
      bindAttrs( newFdNode );
      fillChildren(newFdNode);
      let nxt_node = newFdNode.realNode;
      console.log( ' ++++ ', nxt_node,  pre_node);
      pNode.replaceChild(nxt_node, pre_node);
      
      pre_node = nxt_node;
      return ;
      // {
      //   next_value: nxtTrimedValue,
      //   parent_node: pNode,
      // };
    }
    
    // Features: 替换为组件 
    if (isFDComponent(nxtTrimedValue)) {
      runCpntRemove(fdNode.context); 
      // todo: 待优化为 createFdNode 
      fdNode = createFdNode({
        varyTag, 
        tagName: nxtTrimedValue,
        attrs,
        children, 
      })
      nxt_node = fdNode.realNode;
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      componentAttrs(fdNode);
      return ;
      // {
      //   next_value: nxtTrimedValue,
      //   parent_node: pNode,
      // };
    }
    
    console.error(err_msg01, nxtTrimedValue)
  })
} 


