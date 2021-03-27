
export default function vary_str(txtNode, text, varyWrap){
  varyWrap.$mounted_run(text);
  varyWrap.$add_set((p_v, n_v)=>{
    txtNode.textContent = n_v;
    return [n_v];
  }, txtNode)
} 


