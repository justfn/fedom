

// Feature: 子节点为数组且为动态的时 
function vary_arr(elem, child, varyWrap, isCpt, fdChild){
  varyWrap.$mounted_run(...child);
  varyWrap.$add_set((p_v, n_v)=>{
    console.log('# todo 待优化');
    let pNode = elem;
    pNode.innerHTML = '';
    n_v.forEach((itm)=>{
      fdChild(elem, itm, null, isCpt); 
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

function vary_nod(elem, varyWrap){
  let node = varyWrap.get(false);
  varyWrap.$mounted_run(node);
  varyWrap.$add_set((p_v, n_v)=>{
    let pNode = p_v.parentNode;
    // pNode.removeChild(p_v);
    // pNode.appendChild(n_v); 
    pNode.replaceChild(n_v,p_v);
    return [n_v];
  }, elem)
} 



export {
  vary_arr,
  vary_str,
  vary_nod,
}
