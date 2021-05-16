
import { globalWrite, } from "./utils/globalWR.js";
import trimTextChild from "./compiler/child/trimTextChild.js";
import { 
  isArrayValue,
  isNodeValue,
  isTextValue,
  isComponentValue,
} from "./utils/judge.js";

export default function render( listOrNodeOrTextOrComponent, wrap){
  if ( isArrayValue(listOrNodeOrTextOrComponent) ) {
    listOrNodeOrTextOrComponent.forEach((itm,idx)=>{ render(itm, wrap); })
    return listOrNodeOrTextOrComponent;
  }
  
  if ( isTextValue(listOrNodeOrTextOrComponent) ) {
    listOrNodeOrTextOrComponent = trimTextChild(listOrNodeOrTextOrComponent);
    listOrNodeOrTextOrComponent = document.createTextNode(listOrNodeOrTextOrComponent);
    wrap.appendChild(listOrNodeOrTextOrComponent);
    return listOrNodeOrTextOrComponent;
  }
  
  if ( isNodeValue(listOrNodeOrTextOrComponent) ) {
    wrap.appendChild(listOrNodeOrTextOrComponent);
    return {
      instance: listOrNodeOrTextOrComponent.instance, 
      context: listOrNodeOrTextOrComponent.context, 
    };
  }
   
  console.log('render todo: ', listOrNodeOrTextOrComponent );
} 



