// import compiler from "./compiler.js";
import { isVary, } from "../vary/Vary.js";


export default function main(tag, attrs, varyWrap){
  /* brance: tagName */
  if (typeof tag === 'string') {
    return {
      elem: document.createElement(tag),
    }
  }
  
  /* brance: component */
  if (typeof tag === 'function') {
    return {
      elem: tag(attrs),
      isCpt: true, 
    };
  }
  
  /* brance: Vary */
  if (isVary(tag)) {
    return {
      elem: main(tag.value, attrs, tag),
    }
  }
  
  console.warn('# todo tag', tag, attrs, varyWrap);
}