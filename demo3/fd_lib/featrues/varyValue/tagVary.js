
import createFNode from "../../compiler/fNode/fNode.js";
import addAttrs from "../../compiler/attrs/addAttrs.js";
import fillChildren from "../../compiler/child/fillChild.js";
import componentRender from "../../featrues/Component/componentRender.js";
import componentUpdate from "../../featrues/Component/componentUpdate.js";
import { removeComponentRun, } from "../../featrues/lifecycle/onUnmount.js";
import componentAttrs from "../../compiler/attrs/componentAttrs.js";
import { 
  isBooleanValue, 
  isStringValue, 
  isFDComponent, 
  isEmptyValue, 
} from "../../utils/judge.js";
import {
  errLog, 
} from "../../utils/dev.js";


/* ** Features: 标签名动态化
注意 变量名需大写否则jsx不处理  
*/
const err_msg01 = 'unsuport vary tag'
export default function varyTagName(fNode){
  let varyTag = fNode.varyTag;
  if (!varyTag) { return ; }
  // return ;
  
  
  let {
    realNode, 
    attrs, 
    props, 
    children, 
  } = fNode;
    // console.log("000000000 child 1", children)
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
      removeComponentRun(fNode); 
      componentUpdate(fNode, null, null);
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
      removeComponentRun(fNode); 
      componentUpdate(fNode, null, null);
      
      let newFNode = createFNode({
        varyTag: null, 
        tagName: nxtTrimedValue,
        attrs, 
        children,
      });
      addAttrs( newFNode );
      fillChildren(newFNode);
      let nxt_node = newFNode.realNode;
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
      removeComponentRun(fNode); 
      // todo: 待优化为 createFNode 
      // console.log("000000000 child", children)
      fNode = createFNode({
        varyTag, 
        tagName: nxtTrimedValue,
        attrs,
        children, 
      })
      // componentRender(nxtTrimedValue,props,varyTag);
      // componentUpdate(fNode, context);
      nxt_node = fNode.realNode;
      pNode.replaceChild(nxt_node, pre_node);
      pre_node = nxt_node;
      componentAttrs(fNode);
      return ;
      // {
      //   next_value: nxtTrimedValue,
      //   parent_node: pNode,
      // };
    }
    
    errLog(err_msg01, nxtTrimedValue);
  })
} 


