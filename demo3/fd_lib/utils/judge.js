/** 判断函数 
*/
import config from "../config/config.js";
import message from "../config/message.js";
import Component from "../featrues/Component/Component.js";
import { Vary, } from "../featrues/Vary/Vary.js";
import { ListVary, } from "../featrues/Vary/VaryList.js";
import { KeysVary, } from "../featrues/Vary/VaryKeys.js";
import { Ref, } from "../featrues/ref/Ref.js";


// 是否为空值 
export function isNullValue(val){
  return val===null;
} 
// 是否为布尔值 
export function isBooleanValue(val){
  return typeof val==='boolean';
} 
// 是否为数值 
export function isNumberValue(val){
  if ( Number.isNaN(val) ) { return false; }
  
  return typeof val==='number';
} 
// 是否为字符串 
export function isStringValue(val){
  return typeof val==='string';
} 
// 是否为键值对对象 
export function isMapValue(val){
  // to_do: 待优化 
  return typeof val==='object';
} 
// 是否为数组 
export function isArrayValue(val){
  return val instanceof Array;
} 
// 是否为函数 
export function isFunctionValue(val){
  return typeof val==='function';
} 
// 是否为Node节点 
export function isNodeValue(val){
  return val instanceof Node;
} 
// 是否为注释节点 
export function isCommentNode(val){
  if (!val) { return false; }
  return val.nodeName==='#comment';
} 
// 是否为Component类型 
export function isComponentValue(val){
  if (!val) { return false; }
  
  let proto = val.prototype;
  if (!proto) { return false; }
  
  return proto instanceof Component;
} 
// 值是否为可变量值 
export function isVaryValue(val){
  if (!val) { return false; }
  
  let bol = val instanceof Vary;
  if (bol && isVaryValue(val.$get(false))) { throw message.errors.mutil_vary; }
  
  return bol;
}
// 值是否为列表可变量值 
export function isVaryList(val){
  if (!val) { return false; }
  
  let bol = val instanceof ListVary;
  
  return bol;
} 
// 值是否为键值集可变量值 
export function isVaryKeys(val){
  if (!val) { return false; }
  
  let bol = val instanceof KeysVary;
  
  return bol;
} 
// 值是否为Ref类型  
export function isRefValue(val){
  if (!val) { return false; }
  
  let bol = val instanceof Ref;
  
  return bol;
}

// 是否为空值  [复合类型]
export function isEmptyValue(val){
  if (val===undefined) { return true; }
  if (val===null) { return true; }
  
  return false;
} 
// 是否为fedom组件 [复合类型]
export function isFDComponent(val){
  return isComponentValue(val) || isFunctionValue(val);
} 
// 是否为文本值 [复合类型]: 
// 包含数值 空值 undefined/null 空值为 '' 
export function isTextValue(val){
  if (isEmptyValue(val)) { return true; }
  if (isNumberValue(val)) { return true; }
  if (isStringValue(val)) { return true; }
  
  return false;
} 


// export function isOrginTag(val){
//   if (!isStringValue(val)) { return console.log(' # isOrginTag function error: arguments is not string '); }
// 
//   return config.orgin_elements.includes(val.toLowerCase());
// } 



