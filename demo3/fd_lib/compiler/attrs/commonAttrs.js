/* ** 处理通用属性属性 
*/

import {
  varyAttrClassStr,
  varyAttrClassArr,
  varyAttrClassAitm,
} from "../../featrues/VaryAction/varyAttrClass.js";
import {
  varyAttrStyleStr,
  varyAttrStyleObj,
  varyAttrStyleOval,
} from "../../featrues/VaryAction/varyAttrStyle.js";
import { 
  isVaryValue,
  isStringValue, 
  isMapValue, 
  isFunctionValue,
  isArrayValue, 
  isAsyncValue, 
} from "../../utils/judge.js";

export function addRefAttr(fdNode, value ){
  if (isAsyncValue(value)) {
    value.resolve(fdNode.realNode);
    return ;
  }
  
  if ( isFunctionValue(value) ) { 
    value(fdNode.realNode);
    return ; 
  }
  
  
} 

export function addClassAttr(fdNode, value, varyAttr){
  if (isVaryValue(value)) {
    addClassAttr(fdNode, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if ( isStringValue(value) ) {
    fdNode.realNode.setAttribute("class", value);
    
    /* ** Features: 
    */
    varyAttrClassStr(fdNode, varyAttr);
    
    return ;
  }
  // 出口2：
  if ( isArrayValue(value) ) {
    let vl = value.reduce((retV,itm)=>{ 
      let it = itm; 
      
      /* ** Features:  
      */
      it = varyAttrClassAitm(fdNode, itm);
      
      return  retV + ' ' + it
    },'')
    vl = vl.slice(1)
    fdNode.realNode.setAttribute("class", vl);
    
    /* ** Features: 
    */
    varyAttrClassArr(fdNode, varyAttr)
    
    return ;
  }
  
  console.warn('# todo attrs class', fdNode, value);
} 

export function addStyleAttr(fdNode, value, varyAttr){
  if (isVaryValue(value)) {
    addStyleAttr(fdNode, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if ( isStringValue(value) ) {
    fdNode.realNode.setAttribute("style", value);
    
    /* ** Features: 
    */
    varyAttrStyleStr(fdNode, varyAttr);
    
    return ;
  }
  // 出口2：
  if ( isMapValue(value) ) {
    for(var ky in value){
      let vl = value[ky];
      
      /* ** Features: 
      */
      vl = varyAttrStyleOval(fdNode, ky, vl);
      
      fdNode.realNode.style[ky] = vl;
    };
    
    /* ** Features:  
    */
    varyAttrStyleObj(fdNode, varyAttr);
    
    return ;
  }
  console.warn('# todo attrs style', fdNode, value);
} 

export function addEventAttr(fdNode, evtName, listener){
  
  fdNode.realNode.addEventListener(evtName, (evt)=>{
    return listener(evt);
  })
  
} 




