
import { globalWrite, } from "./utils/globalWR.js";
import trimTextChild from "./compiler/child/trimTextChild.js";
import { 
  isArrayValue,
  isNodeValue,
  isTextChild,
} from "./utils/judge.js";

export default function render(nodes, appRootWrap){
  globalWrite('elems.root', appRootWrap);
  if ( isArrayValue(nodes) ) {
    nodes.forEach((itm,idx)=>{ nodes(itm, appRootWrap); })
    return ;
  }
  
  if ( isTextChild(nodes) ) {
    nodes = trimTextChild(nodes);
    nodes = document.createTextNode(nodes);
  }
  else if ( !isNodeValue(nodes) ) {
    console.log('## to_do: render unsport nodes', nodes);
  }
  
  appRootWrap.appendChild(nodes);
} 



