/* 处理属性 */
import { isVary, } from "../../vary/Vary.js";

function deal_class(elem, value){
  
  if (typeof value === 'string') {
    elem.setAttribute("class", value);
    return ;
  }
  
  if (value instanceof Array) {
    let vl = value.reduce((retV,itm)=>{ 
      let it = itm; 
      if (isVary(itm)) { 
        it = itm.get(false);
        itm.$mounted_run(elem.classList);
        // 收集更新 
        itm.$add_set((p_v, n_v)=>{
          if (p_v!=='') { elem.classList.remove(p_v); }
          if (n_v!=='') { elem.classList.add(n_v); }
          return [n_v];
        }, elem.classList)
      }
      return  retV + ' ' + it
    },'')
    vl = vl.slice(1)
    elem.setAttribute("class", vl);
    return ;
  }
  
  if (isVary(value)) {
    let vl = value.get(false);
    value.$mounted_run(elem.className);
    // 收集更新 
    value.$add_set((p_v, n_v)=>{
      elem.className = n_v;
      return [n_v];
    }, elem.className);
    return ;
  }

  console.warn('# todo attrs class', elem, value);
} 

function deal_style(elem, value){
  if (isVary(value)) {
    deal_style(elem, value.get(false));
    // todo 
    console.warn('# todo style', elem, value);
    return ;
  }
  if (typeof value === 'string') {
    elem.setAttribute("style", value);
    return ;
  }
  if (typeof value === 'object') {
    for(var ky in value){
      let vl = value[ky];
      if (isVary(vl)) {
        elem.style[ky] = vl.get(false);
        vl.$add_set((p_v,n_v)=>{
          elem.style[ky] = n_v;
          return [n_v];
        })
        continue ;
      }
      elem.style[ky] = vl;
    };
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


export {
  deal_class,
  deal_style,
  deal_event,
  deal_ref_callback,
};


