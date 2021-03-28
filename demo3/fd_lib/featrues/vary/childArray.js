


// Feature: 子节点为数组且为动态的时 
export default function childArray(fNode, child, varyChild, callback){
  if (!varyChild) { return ; }
  
  let realNode = fNode.realNode;
  varyChild.$mounted_run(...child);
  varyChild.$add_set((p_v, n_v)=>{
    console.log('# todo 待优化');
    let pNode = realNode;
    pNode.innerHTML = '';
    n_v.forEach((itm)=>{
      callback(fNode, itm, null); 
    })
    return [n_v];
  })
} 



