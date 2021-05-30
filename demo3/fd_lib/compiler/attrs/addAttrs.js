
import config from "../../config/config.js";
import componentAttrs from "./componentAttrs.js";
import { 
  addClassAttr, 
  addStyleAttr, 
  addEventAttr, 
  addRefAttr, 
} from "./commonAttrs.js";
import { 
  isFormNode, 
  addFormAttrs, 
} from "./formAttrs.js";
import {
  isCommentNode, 
  isFDComponent, 
} from "../../utils/judge.js";
import attrVaryShow from "../../featrues/varyValue/attrVaryShow.js";

export default function addAttrs(fNode){
  let {
    tagName, 
    realNode, 
    attrs, 
  } = fNode;
  attrVaryShow(realNode, attrs);
  if ( isFDComponent(tagName) ) { 
    componentAttrs(fNode); 
    return ; 
  }
  if (isCommentNode(realNode)) { return ; }
  
  
  for(let key in attrs){
    const val = attrs[key];
    
    if (val===undefined || val===null) { val = ''; }
    
    /* brance: class */
    if (key==='className') {
      addClassAttr(fNode, val);
      continue;
    }
    /* brance: style */
    if (key==='style') {
      addStyleAttr(fNode, val);
      continue;
    }
    /* brance: event */
    if (/^on(\w+)$/.test(key)) {
      addEventAttr(fNode, RegExp.$1.toLowerCase(), val);
      continue;
    }
    /* brance: ref_callback */
    if (key==='ref' ) {
      addRefAttr(fNode, val);
      continue; 
    }
    /* brance: form_realNodes */
    if (isFormNode(fNode)) {
      addFormAttrs(fNode, key, val);
      continue; 
    }
    /* brance: other_key */
    try {
      realNode.setAttribute(key, val);
    } 
    catch (e) {
      console.warn('# todo attrs other', realNode, key, val);
    } 
    
  };
}


