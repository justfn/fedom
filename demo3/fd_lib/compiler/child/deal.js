
import { 
  vary_str,
  vary_nod,
} from "./vary_value.js";

function deal_text(elem, text, varyWrap){
  
  let txtNode = document.createTextNode(text);
  elem.appendChild(txtNode);
  
  if (varyWrap) {
    vary_str(txtNode, text, varyWrap)
  }
  
} 

function deal_node(elem, node, varyWrap){
  elem.appendChild(node);
  
  if (varyWrap) {
    vary_nod( elem, node, varyWrap );
  }
} 


export {
  deal_text,
  deal_node,
}

