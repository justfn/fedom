/* 处理属性 */
import { isVary, } from "../../vary/Vary.js";
import {
  vary_cls_str,
  vary_cls_arr,
  vary_cls_arr_itm,
  vary_sty_str,
  vary_sty_obj,
  vary_sty_obj_val,
} from "./vary_value.js";

function deal_class(elem, value, varyWrap){
  if (isVary(value)) {
    deal_class(elem, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if (typeof value === 'string') {
    elem.setAttribute("class", value);
    if (varyWrap) { vary_cls_str(elem, varyWrap) }
    return ;
  }
  // 出口2：
  if (value instanceof Array) {
    let vl = value.reduce((retV,itm)=>{ 
      let it = itm; 
      if (isVary(itm)) { 
        it = vary_cls_arr_itm(elem, itm);
      }
      return  retV + ' ' + it
    },'')
    vl = vl.slice(1)
    elem.setAttribute("class", vl);
    if (varyWrap) {
      vary_cls_arr(elem, varyWrap)
    }
    return ;
  }
  
  console.warn('# todo attrs class', elem, value);
} 

function deal_style(elem, value, varyWrap){
  if (isVary(value)) {
    deal_style(elem, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if (typeof value === 'string') {
    elem.setAttribute("style", value);
    if (varyWrap) { vary_sty_str(elem, varyWrap); }
    return ;
  }
  // 出口2：
  if (typeof value === 'object') {
    for(var ky in value){
      let vl = value[ky];
      if (isVary(vl)) { vl = vary_sty_obj_val(elem, ky, vl); }
      elem.style[ky] = vl;
    };
    if (varyWrap) { vary_sty_obj(elem, varyWrap) }
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


