

export default function tagFunction(fNode){
  let varyTag = fNode.varyTag;
  if (!varyTag) { return ; }
  
  let {
    realNode, 
    props, 
  } = fNode;
  
  let pNode = realNode.parentNode;
  let pre_node = realNode;
  let nxt_node = null;
  varyTag.$add_set((p_v, n_v)=>{
    pNode = pNode ?? pre_node.parentNode;
    nxt_node = n_v(props, {
      mounted: (fn)=>{
      },
    })
    pNode.replaceChild(nxt_node, pre_node);
    pre_node = nxt_node;
    // 替换掉组件 
    return [n_v, pNode];
  })
} 


