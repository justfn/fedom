


function deal_text(elem, text, varyWrap){
  
  let txtNode = document.createTextNode(text);
  elem.appendChild(txtNode);
  
  if (varyWrap) {
    varyWrap.$mounted_run(text);
    varyWrap.$add_set((p_v, n_v)=>{
      txtNode.textContent = n_v;
      return [n_v];
    }, txtNode)
  }
  
} 


export {
  deal_text,
}

