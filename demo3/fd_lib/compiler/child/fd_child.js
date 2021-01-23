import { isVary, } from "../../vary/Vary.js";
import { deal_node, } from "./node.js";
import { deal_text, } from "./text.js";

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
      child.forEach(cldItm=>{
        // elem.appendChild(cldItm);
        fdChild(elem, cldItm, null, isCpt)
      })
      varyWrap.$mounted_run(...child);
      varyWrap.$add_set((p_v, n_v)=>{
        // let pNode = p_v[0].parentNode;
        let pNode = elem;
        pNode.innerHTML = '';
        // todo 待优化 
        n_v.forEach((i)=>{
          // pNode.appendChild(i);
          fdChild(elem, i, null, isCpt); 
        })
        return [n_v];
      })
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








