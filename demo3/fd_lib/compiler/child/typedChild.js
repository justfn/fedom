


export function textChild(realNode, text){
  let txtNode = document.createTextNode(text);
  realNode.appendChild(txtNode);
  return txtNode;
} 
export function nodeChild(realNode, node){
  realNode.appendChild(node);
} 



