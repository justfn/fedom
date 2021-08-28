
import config from "../../config/config.js";
import {
  isCommentNode, 
  isFDComponent, 
} from "../../utils/judge.js";
import componentAttrs from "./attrsCpnt.js";
import { 
  addClassAttr, 
  addStyleAttr, 
  addEventAttr, 
  addOtherAttr, 
  addRefAttr, 
} from "./attrsCommon.js";
import { 
  isFormNode, 
  addFormAttrs, 
} from "./attrsForm.js";
import attrVaryShow from "../../featrues/VaryAction/varyAttrShow.js";

export default function bindAttrs(fdNode){
  let {
    tagName, 
    realNode, 
    attrs, 
  } = fdNode;
  attrVaryShow(realNode, attrs);
  if ( isFDComponent(tagName) ) { 
    componentAttrs(fdNode); 
    return ; 
  }
  if (isCommentNode(realNode)) { return ; }
  
  
  for(let key in attrs){
    const val = attrs[key];
    
    if (val===undefined || val===null) { val = ''; }
    
    /* brance: class */
    if (key==='className') {
      addClassAttr(fdNode, val);
      continue;
    }
    /* brance: style */
    if (key==='style') {
      addStyleAttr(fdNode, val);
      continue;
    }
    /* brance: event */
    if (/^on(\w+)$/.test(key)) {
      addEventAttr(fdNode, RegExp.$1.toLowerCase(), val);
      continue;
    }
    /* brance: ref_callback */
    if (key==='ref' ) {
      addRefAttr(fdNode, val);
      continue; 
    }
    /* brance: form_realNodes */
    if (isFormNode(fdNode)) {
      addFormAttrs(fdNode, key, val);
      continue; 
    }
    /* brance: other_key */
    addOtherAttr(fdNode, key, val);
  };
}

