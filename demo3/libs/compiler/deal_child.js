import { isVary, } from "../vary/Vary.js";
import compiler from "./compiler.js";


export default function main(elem, child, varyWrap) {
  /* brance: undefind null */
  if (child === undefined || child === null) {
    child = '';
    deal_text(elem, child, varyWrap);
    return;
  }

  /* brance: text */
  if (typeof child === 'string' || typeof child === 'number' ) {
    child += '';
    deal_text(elem, child, varyWrap);
    return ;
  }
  
  /* brance: node */
  if (child instanceof Node) { 
    deal_node(elem, child, varyWrap);
    return ;
  }

  /* brance: vary */
  if (isVary(child)) { 
    main(elem, child.value, child); 
    return ;
  }
  
  /* brance: arr */
  if (child instanceof Array) { 
    if (varyWrap) {
      child.forEach((itm,idx)=>{
        elem.appendChild(itm);
      })
      varyWrap.$add_update((p_v, n_v)=>{
        let pNode = p_v[0].parentNode;
        pNode.innerHTML = '';
        // todo 待优化 
        n_v.forEach((i)=>{
          pNode.appendChild(i);
        })
        return n_v;
      })
      return ;
    }
    
    child.forEach((itm,idx)=>{
      main(elem, itm);
    })
  }
  
  console.warn('# todo child', elem, child);
}

function deal_text(elem, text, varyWrap){
  
  let txtNode = document.createTextNode(text);
  elem.appendChild(txtNode);
  
  if (varyWrap) {
    varyWrap.$add_update((p_v, n_v)=>{
      txtNode.textContent = n_v;
      return n_v;
    }, txtNode)
  }
  
} 
function deal_node(elem, node, varyWrap){
  elem.appendChild(node);
  
  if (varyWrap) {
    varyWrap.$add_update((p_v, n_v)=>{
      let pNode = p_v.parentNode;
      pNode.removeChild(p_v);
      pNode.appendChild(n_v); 
      return n_v;
    }, elem)
  }
} 







