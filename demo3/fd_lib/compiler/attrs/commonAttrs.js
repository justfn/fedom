/* ** 处理通用属性属性 
*/

import {
  varyAttrClassStr,
  varyAttrClassArr,
  varyAttrClassAitm,
} from "../../featrues/varyValue/attrClass.js";
import {
  varyAttrStyleStr,
  varyAttrStyleObj,
  varyAttrStyleOval,
} from "../../featrues/varyValue/attrStyle.js";
import { 
  isVaryValue,
  isStringValue, 
  isMapValue, 
  isFunctionValue,
  isArrayValue, 
  isAsyncValue, 
} from "../../utils/judge.js";

export function addRefAttr(fNode, value ){
  if (isAsyncValue(value)) {
    value.resolve(fNode.realNode);
    return ;
  }
  
  if ( isFunctionValue(value) ) { 
    value(fNode.realNode);
    return ; 
  }
  
  
} 

export function addClassAttr(fNode, value, varyAttr){
  if (isVaryValue(value)) {
    addClassAttr(fNode, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if ( isStringValue(value) ) {
    fNode.realNode.setAttribute("class", value);
    
    /* ** Features: 
    */
    varyAttrClassStr(fNode, varyAttr);
    
    return ;
  }
  // 出口2：
  if ( isArrayValue(value) ) {
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
  if (isVaryValue(value)) {
    addStyleAttr(fNode, value.get(false), value);
    return ;
  }
  
  // 出口1：
  if ( isStringValue(value) ) {
    fNode.realNode.setAttribute("style", value);
    
    /* ** Features: 
    */
    varyAttrStyleStr(fNode, varyAttr);
    
    return ;
  }
  // 出口2：
  if ( isMapValue(value) ) {
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




