import { isVary, } from "../vary/Vary.js";

export default function(elem, attrs, isCpt){
  // /* brance: __scopeId todo */
  // if (key==='__scope') {
  //   elem.setAttribute(`data-fd_scope_id`, `fd_${val}`);
  //   continue; 
  // }
  
  if (isCpt) { 
    deal_cpt(elem, attrs);
    
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
    
    // /* brance: ref_callback */
    if (key==='ref' ) {
      deal_ref_callback(elem, val);
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

function deal_cpt(elem, attrs){
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if (attrs.ref) {
    deal_ref_callback(elem, attrs.ref);
  }
} 
function deal_class(elem, value){
  
  if (typeof value === 'string') {
    elem.setAttribute("class", value);
    return ;
  }
  
  if (value instanceof Array) {
    let vl = value.reduce((retV,itm)=>{ 
      let it = itm; 
      if (isVary(itm)) { 
        it = itm.value;
        itm.$mounted_run(elem.classList);
        // 收集更新 
        itm.$add_update((p_v, n_v)=>{
          elem.classList.remove(p_v);
          elem.classList.add(n_v);
        }, elem.classList)
      }
      return  retV + ' ' + it
    },'')
    vl = vl.slice(1)
    elem.setAttribute("class", vl);
    return ;
  }
  
  if (isVary(value)) {
    console.warn('todo');
    return ;
  }

  console.warn('# todo attrs class', elem, value);
} 
function deal_style(elem, value){
  
  if (typeof value === 'string') {
    elem.setAttribute("style", value);
    return ;
  }
  
  if (isVary(value)) {
    console.warn('# todo style', elem, value);
    return ;
  }
  
  if (typeof value === 'object') {
    let val = '';
    for(var ky in value){
      let vl = value[ky];
      if (isVary(vl)) {
        console.warn('# todo style obj', elem, value, ky, vl);
        return ;
      }
      val += ` ${ky}:${value[ky]};`
    };
    val = val.slice(1);
    elem.setAttribute("style", val);
    return ;
  }
  
  console.warn('# todo attrs style', elem, value);
} 
function deal_event(elem, evtName, listener){
  
  elem.addEventListener(evtName, (evt)=>{
    return listener(evt);
  })
  
} 
function deal_ref_callback(elem, callback ){
  if (typeof callback !== 'function') { return ; }
  
  callback(elem);
} 


