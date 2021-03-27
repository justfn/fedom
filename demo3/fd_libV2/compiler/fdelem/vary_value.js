import fd_attrs from "../attrs/fd_attrs.js";



function vary_cpt(elem, attrs, varyWrap){
  let pNode = elem.parentNode;
  let pre_node = elem;
  let nxt_node = null;
  varyWrap.$add_set((p_v, n_v)=>{
    pNode = pNode ?? pre_node.parentNode;
    nxt_node = n_v(attrs, {
      mounted: (fn)=>{
      },
    })
    console.log( elem.parentNode );
    pNode.replaceChild(nxt_node, pre_node);
    pre_node = nxt_node;
    // 替换掉组件 
    return [n_v, pNode];
  })
} 

function vary_str(elem, attrs, varyWrap){
  let pNode = elem.parentNode;
  let pre_node = elem; 
  let nxt_node = null;
  varyWrap.$add_set((p_v, n_v, atrs)=>{
    // Feature_more: 设值为false的值,则直接删除该节点 
    pNode = pNode ?? pre_node.parentNode;
    if (!n_v) {
      pNode.removeChild(pre_node);
      return [n_v];
    }
    
    // console.log( pNode );
    nxt_node = document.createElement(n_v);
    fd_attrs(nxt_node, atrs, false)
    Array.prototype.forEach.call( [...pre_node.childNodes], (itm)=>{
      nxt_node.appendChild(itm);
    })
    pNode.replaceChild(nxt_node, pre_node);
    pre_node = nxt_node;
    return [n_v, pNode];
  }, attrs)

} 

let vary_str_el = vary_str;
export {
  vary_cpt,
  vary_str,
  vary_str_el,
}

