
export default function childString(txtNode, text, varyChild){
  if (!varyChild) { return ; }
  
  varyChild.$mounted_run(text);
  varyChild.$add_set((p_v, n_v)=>{
    txtNode.textContent = n_v;
    return [n_v];
  }, txtNode)
} 


