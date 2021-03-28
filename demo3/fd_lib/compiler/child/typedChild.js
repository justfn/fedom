


export function textChild(fNode, text){
  let txtNode = document.createTextNode(text);
  fNode.realNode.appendChild(txtNode);
  return txtNode;
} 
export function nodeChild(fNode, node){
  fNode.realNode.appendChild(node);
} 



