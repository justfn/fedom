

function deal_text(elem, text){
  let txtNode = document.createTextNode(text);
  elem.appendChild(txtNode);
  return txtNode;
} 

function deal_node(elem, node){
  elem.appendChild(node);
} 


export {
  deal_text,
  deal_node,
}

