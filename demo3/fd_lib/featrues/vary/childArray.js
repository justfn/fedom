


// Feature: 子节点为数组且为动态的时 
export default function vary_arr(fNode, child, varyWrap, fdChild){
  let realNode = fNode.realNode;
  
  varyWrap.$mounted_run(...child);
  varyWrap.$add_set((p_v, n_v)=>{
    console.log('# todo 待优化');
    let pNode = realNode;
    pNode.innerHTML = '';
    n_v.forEach((itm)=>{
      fdChild(fNode, itm, null); 
    })
    return [n_v];
  })
} 



