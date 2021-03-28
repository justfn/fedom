

export default  function childNode(fNode, varyWrap){
  if (!varyWrap) { return ; }
  
  let node = varyWrap.get(false);
  varyWrap.$mounted_run(node);
  varyWrap.$add_set((p_v, n_v)=>{
    let pNode = p_v.parentNode;
    // pNode.removeChild(p_v);
    // pNode.appendChild(n_v); 
    pNode.replaceChild(n_v,p_v);
    return [n_v];
  }, fNode.realNode)
} 

