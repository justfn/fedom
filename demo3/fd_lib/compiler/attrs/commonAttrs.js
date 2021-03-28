/* ** 处理通用属性属性 
*/

import message from "../../message.js";
import { isVary, } from "../../featrues/vary/Vary.js";
import {
  varyAttrClassStr,
  varyAttrClassArr,
  varyAttrClassAitm,
} from "../../featrues/vary/attrClass.js";
import {
  varyAttrStyleStr,
  varyAttrStyleObj,
  varyAttrStyleOval,
} from "../../featrues/vary/attrStyle.js";

export function addClassAttr(fNode, value, varyAttr){
  if (isVary(value)) {
    if (varyAttr) { throw message.errors.mutil_vary; }
    
    addClassAttr(fNode, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if (typeof value === 'string') {
    fNode.realNode.setAttribute("class", value);
    
    /* ** Features: 
    */
    varyAttrClassStr(fNode, varyAttr);
    
    return ;
  }
  // 出口2：
  if (value instanceof Array) {
    let vl = value.reduce((retV,itm)=>{ 
      let it = itm; 
      
      /* ** Features:  
      */
      it = varyAttrClassAitm(fNode, itm);
      
      return  retV + ' ' + it
    },'')
    vl = vl.slice(1)
    fNode.realNode.setAttribute("class", vl);
    
    /* ** Features: 
    */
    varyAttrClassArr(fNode, varyAttr)
    
    return ;
  }
  
  console.warn('# todo attrs class', fNode, value);
} 

export function addStyleAttr(fNode, value, varyAttr){
  if (isVary(value)) {
    if (varyAttr) { throw message.errors.mutil_vary; }
    
    addStyleAttr(fNode, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if (typeof value === 'string') {
    fNode.realNode.setAttribute("style", value);
    
    /* ** Features: 
    */
    varyAttrStyleStr(fNode, varyAttr);
    
    return ;
  }
  // 出口2：
  if (typeof value === 'object') {
    for(var ky in value){
      let vl = value[ky];
      
      /* ** Features: 
      */
      vl = varyAttrStyleOval(fNode, ky, vl);
      
      fNode.realNode.style[ky] = vl;
    };
    
    /* ** Features:  
    */
    varyAttrStyleObj(fNode, varyAttr);
    
    return ;
  }
  console.warn('# todo attrs style', fNode, value);
} 

export function addEventAttr(fNode, evtName, listener){
  
  fNode.realNode.addEventListener(evtName, (evt)=>{
    return listener(evt);
  })
  
} 

export function addRefAttr(fNode, callback ){
  if (typeof callback !== 'function') { return ; }
  
  callback(fNode.realNode);
} 




