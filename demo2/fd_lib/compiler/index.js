/* 编译器 
*/

import { 
  isVary, 
} from "../vary/Vary.js";
import {
  dealChildren,
  dealAttrs,
} from "./dealElem.js";



function compiler(fEl){
  // console.log(fEl);
  if (typeof fEl === 'function') { fEl = fEl(); }
  
  const {
    tag = 'div',
    children = [],
    ...attrs
  } = fEl; 
  const el = document.createElement(tag);
  
  dealChildren(children, el)
  dealAttrs(attrs, el)
  
  return el;
}
export default compiler;



















