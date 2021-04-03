/** 判断函数 
*/
import config from "../config.js";

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






