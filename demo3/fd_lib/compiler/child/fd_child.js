import { isVary, } from "../../vary/Vary.js";
import { 
  deal_node, 
  deal_text, 
} from "./deal.js";
import { 
  vary_arr, 
} from "./vary_value.js";

function fdChild(elem, child, varyWrap, isCpt ) {
  /* brance: vary */
  if (isVary(child)) { 
    fdChild(elem, child.get(false), child, isCpt); 
    return ;
  }
  /* brance: arr */
  if (child instanceof Array) { 
    // Feature: 子节点为数组且为动态的时 
    if (varyWrap) {
      vary_arr(elem, child, varyWrap, isCpt, fdChild);
      return ;
    }
    
    child.forEach((cldItm,idx)=>{
      fdChild(elem, cldItm, null, isCpt);
    })
    return ;
  }
  
  /* Result: undefind null */
  if (child === undefined || child === null) {
    deal_text(elem, '', varyWrap);
    return;
  }
  /* Result: text */
  if (typeof child === 'string' || typeof child === 'number' ) {
    child += '';
    deal_text(elem, child, varyWrap);
    return ;
  }
  /* Result: node */
  if (child instanceof Node) { 
    deal_node(elem, child, varyWrap);
    return ;
  }
  /* Result: other */
  console.warn('# todo child', elem, child);
  fdChild(elem, child.toString(), null, isCpt);
}
export default fdChild;








