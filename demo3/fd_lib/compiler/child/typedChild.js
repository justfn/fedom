


export function textChild(realNode, text){
  let txtNode = document.createTextNode(text);
  realNode.appendChild(txtNode);
  return txtNode;
} 
export function nodeChild(fNode, node){
  fNode.realNode.appendChild(node);
} 



