import { isVary, } from "../../featrues/vary/Vary.js";
import fd_attrs from "../attrs/fd_attrs.js";
import add_cpt_apis from "./add_cpt_apis.js";
import { 
  vary_str, 
  vary_cpt, 
} from "./vary_value.js";




function fd_elem(tag, varyWrap, attrs, children){
  if (isVary(tag)) { 
    let _tag = tag.get(false);
    return fd_elem( _tag, tag, attrs, children); 
  }
  
  /* output 1: component */
  if (typeof tag === 'function') {
    // 注意：此处又将调用 compiler 
    let { realNode, ...rest } = add_cpt_apis(tag, attrs, children);
    // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
    if (varyWrap) { vary_cpt(realNode, attrs, varyWrap); }
    
    return {
      realNode: realNode,
      isCpt: true, 
      ...rest,
    };
  }
  /* output 2: tagName 最终的出口 */
  if (typeof tag === 'string') {
    let realNode = document.createElement(tag);
    // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
    if (varyWrap) { vary_str(realNode, attrs, varyWrap); }
    
    return {
      realNode: realNode,
      isCpt: false, 
    }
  }
  /* output 3: other todo */
  console.warn('# todo tag', tag, attrs, varyWrap);
}
export default fd_elem;



