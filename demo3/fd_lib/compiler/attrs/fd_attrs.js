import { 
  deal_cpt, 
} from "./cpt.js";
import { 
  deal_class, 
  deal_style, 
  deal_event, 
  deal_ref_callback, 
} from "./attr.js";
import { 
  is_form_elems, 
  deal_form_elems, 
} from "./form.js";

function fdAttrs(elem, attrs, isCpt, context){
  // /* brance: __scopeId todo */
  // if (key==='__scope') {
  //   elem.setAttribute(`data-fd_scope_id`, `fd_${val}`);
  //   continue; 
  // }
  
  if (isCpt) { 
    deal_cpt(elem, attrs, context);
    
    return ;
  }
  
  for(let key in attrs){
    const val = attrs[key];
    
    if (val===undefined || val===null) { val = ''; }
    
    /* brance: class */
    if (key==='class') {
      deal_class(elem, val);
      continue;
    }
    /* brance: style */
    if (key==='style') {
      deal_style(elem, val);
      continue;
    }
    /* brance: event */
    if (/^on(\w+)$/.test(key)) {
      deal_event(elem, RegExp.$1.toLowerCase(), val);
      continue;
    }
    /* brance: ref_callback */
    if (key==='ref' ) {
      deal_ref_callback(elem, val);
      continue; 
    }
    /* brance: form_elems */
    if (is_form_elems(elem)) {
      deal_form_elems(elem,key,val);
      continue; 
    }
    /* brance: other_key */
    try {
      elem.setAttribute(key, val);
    } 
    catch (e) {
      console.warn('# todo attrs other', elem, key, val);
    } 
    
  };
}
export default fdAttrs;


