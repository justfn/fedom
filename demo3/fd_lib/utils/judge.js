/** 判断函数 
*/
import config from "../config/config.js";
import message from "../config/message.js";
import Component from "../featrues/Component/Component.js";
import Vary from "../featrues/Vary/Vary.js";
import Ref from "../featrues/ref/Ref.js";

// export function isOrginTag(val){
//   if (!isStringValue(val)) { return console.log(' # isOrginTag function error: arguments is not string '); }
// 
//   return config.orgin_elements.includes(val.toLowerCase());
// } 
export function isNullValue(val){
  return val===null;
} 
export function isEmptyValue(val){
  if (val===undefined) { return true; }
  if (val===null) { return true; }
  
  return false;
} 
export function isBooleanValue(val){
  return typeof val==='boolean';
} 
export function isNumberValue(val){
  return typeof val==='number';
} 
export function isStringValue(val){
  return typeof val==='string';
} 
export function isMapValue(val){
  // to_do: 待优化 
  return typeof val==='object';
} 
export function isArrayValue(val){
  return val instanceof Array;
} 
export function isFunctionValue(val){
  return typeof val==='function';
} 
export function isNodeValue(val){
  return val instanceof Node;
} 
export function isCommentNode(val){
  if (!val) { return false; }
  return val.nodeName==='#comment';
} 
/* ** 判断值是否继承自 Component*/
export function isComponent(val){
  if (!val) { return false; }
  
  let proto = val.prototype;
  if (!proto) { return false; }
  
  return proto instanceof Component;
} 
export function isFDComponent(val){
  return isComponent(val) || isFunctionValue(val);
} 
/* 值是否为可变量对象值 
*/
export function isVaryValue(val){
  if (!val) { return false; }
  
  let bol = val instanceof Vary;
  if (bol && isVaryValue(val.get(false))) { throw message.errors.mutil_vary; }
  
  return bol;
}
/* 值是否为ref 
*/
export function isRefValue(val){
  if (!val) { return false; }
  
  let bol = val instanceof Ref;
  
  return bol;
}


/* 是否为文本节点: 
包含数值 空值 undefined/null 空值为 '' 
*/
export function isTextChild(val){
  if (isEmptyValue(val)) { return true; }
  if (isNumberValue(val)) { return true; }
  if (isStringValue(val)) { return true; }
  
  return false;
} 





