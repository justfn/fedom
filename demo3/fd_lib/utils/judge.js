/** 判断函数 
*/
import config from "../config/config.js";
import message from "../config/message.js";
import Component from "../featrues/Component/Component.js";
import Vary from "../featrues/Vary/Vary.js";

export function isOrginTag(val){
  if (!isStringValue(val)) { return console.log(' # isOrginTag function error: arguments is not string '); }
  
  return config.orgin_elements.includes(val.toLowerCase());
} 
export function isEmptyValue(val){
  if (val===undefined) { return true; }
  if (val===null) { return true; }
  
  return false;
} 
export function isArrayValue(val){
  return val instanceof Array;
} 
export function isMapValue(val){
  // to_do: 待优化 
  return typeof val==='object';
} 
export function isFunctionValue(val){
  return typeof val==='function';
} 
export function isStringValue(val){
  return typeof val==='string';
} 
export function isNumberValue(val){
  return typeof val==='number';
} 
export function isBooleanValue(val){
  return typeof val==='boolean';
} 
export function isNodeValue(val){
  return val instanceof Node;
} 

/* ** 判断值是否继承自 Component*/
export function isComponent(val){
  if (!val) { return false; }
  
  let proto = val.prototype;
  if (!proto) { return false; }
  
  return proto instanceof Component;
} 

/* 值是否为可变量对象 
*/
export function isVary(val){
  if (!val) { return false; }
  
  let bol = val instanceof Vary;
  if (bol && isVary(val.get(false))) { throw message.errors.mutil_vary; }
  
  return bol;
}





