import { isVary, } from "../../vary/Vary.js";
import fd_attrs from "../attrs/fd_attrs.js";
import add_cpt_apis from "./add_cpt_apis.js";
import { 
  deal_vary_str, 
  deal_vary_cpt, 
} from "./vary_value.js";




function fdElem(tag, attrs, children, varyWrap){
  /* Vary */
  if (isVary(tag)) {
    // tag.$mounted_run();
    return fdElem(tag.get(false), attrs, children, tag);
  }
  
  /* output 1: component */
  if (typeof tag === 'function') {
    // 注意：此处又将调用 compiler 
    let { elem, ...rest } = add_cpt_apis(tag, attrs, children);
    // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      deal_vary_cpt(elem, attrs, varyWrap);
    }
    
    return {
      elem: elem,
      isCpt: true, 
      ...rest,
    };
  }
  /* output 2: tagName 最终的出口 */
  if (typeof tag === 'string') {
    let elem = document.createElement(tag);
    // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      deal_vary_str(elem, attrs, varyWrap);
    }
    
    return {
      elem: elem,
      isCpt: false, 
    }
  }
  /* output 3: other todo */
  console.warn('# todo tag', tag, attrs, varyWrap);
}
export default fdElem;



