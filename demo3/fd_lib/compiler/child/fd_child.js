import { isVary, } from "../../featrues/vary/Vary.js";
import { 
  deal_node, 
  deal_text, 
} from "./deal.js";
import { 
  vary_arr, 
  vary_str,
  vary_nod,
} from "./vary_value.js";

function fdChild(elem, child, varyWrap, isCpt ) {
  /* brance: vary */
  if (isVary(child)) { 
    fdChild(elem, child.get(false), child, isCpt); 
    return ;
  }
  /* brance: arr */
  if (child instanceof Array) { 
    child.forEach((cldItm,idx)=>{
      fdChild(elem, cldItm, null, isCpt);
    })
    if (varyWrap) { vary_arr(elem, child, varyWrap, isCpt, fdChild); }
    return ;
  }
  
  /* Result: undefind null */
  if (child === undefined || child === null) {
    let txtNode = deal_text(elem, '');
    if (varyWrap) { vary_str(txtNode, '', varyWrap) }
    return;
  }
  /* Result: text */
  if (typeof child === 'string' || typeof child === 'number' ) {
    child += '';
    let txtNode = deal_text(elem, child);
    if (varyWrap) { vary_str(txtNode, child, varyWrap) }
    return ;
  }
  /* Result: node */
  if (child instanceof Node) { 
    deal_node(elem, child, varyWrap);
    if (varyWrap) { vary_nod( elem, varyWrap ); }
    return ;
  }
  /* Result: other */
  console.warn('# todo child', elem, child);
  fdChild(elem, child.toString(), null, isCpt);
}
export default fdChild;


