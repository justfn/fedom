


function deal_node(elem, node, varyWrap){
  elem.appendChild(node);
  
  if (varyWrap) {
    varyWrap.$mounted_run(node);
    varyWrap.$add_set((p_v, n_v)=>{
      let pNode = p_v.parentNode;
      pNode.removeChild(p_v);
      pNode.appendChild(n_v); 
      return [n_v];
    }, elem)
  }
} 


export {
  deal_node,
};

