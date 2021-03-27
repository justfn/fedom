
import onlyCptAttrs from "./onlyCptAttrs.js";
import { 
  addClassAttr, 
  addStyleAttr, 
  addEventAttr, 
  addRefAttr, 
} from "./restAttrs.js";
import { 
  isFormNode, 
  addFormAttrs, 
} from "./formAttrs.js";

export default function addAttrs(fNode){
  if (fNode.nodeType!=='tag') { return onlyCptAttrs(fNode); }
  
  // /* brance: __scopeId todo */
  // if (key==='__scope') {
  //   realNode.setAttribute(`data-fd_scope_id`, `fd_${val}`);
  //   continue; 
  // }
  
  let {
    realNode, 
    attrs, 
    context,
  } = fNode;
  
  for(let key in attrs){
    const val = attrs[key];
    
    if (val===undefined || val===null) { val = ''; }
    
    /* brance: class */
    if (key==='class') {
      addClassAttr(realNode, val);
      continue;
    }
    /* brance: style */
    if (key==='style') {
      addStyleAttr(realNode, val);
      continue;
    }
    /* brance: event */
    if (/^on(\w+)$/.test(key)) {
      addEventAttr(realNode, RegExp.$1.toLowerCase(), val);
      continue;
    }
    /* brance: ref_callback */
    if (key==='ref' ) {
      addRefAttr(realNode, val);
      continue; 
    }
    /* brance: form_realNodes */
    if (isFormNode(realNode)) {
      addFormAttrs(realNode,key,val);
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


