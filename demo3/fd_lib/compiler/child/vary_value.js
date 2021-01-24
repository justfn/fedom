


function vary_arr(elem, child, varyWrap, isCpt, fdChild){
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
} 

function vary_str(txtNode, text, varyWrap){
  varyWrap.$mounted_run(text);
  varyWrap.$add_set((p_v, n_v)=>{
    txtNode.textContent = n_v;
    return [n_v];
  }, txtNode)
} 

function vary_nod(elem, node, varyWrap){
  varyWrap.$mounted_run(node);
  varyWrap.$add_set((p_v, n_v)=>{
    let pNode = p_v.parentNode;
    pNode.removeChild(p_v);
    pNode.appendChild(n_v); 
    return [n_v];
  }, elem)
} 



export {
  vary_arr,
  vary_str,
  vary_nod,
}
