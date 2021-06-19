/* 注入全局变量方便存储及使用 
*/
import { warnLog, } from "./dev.js";
import { 
  isComponentValue, 
  isVaryValue, 
} from "../utils/judge.js";

if (!window.$fd_kit) { window.$fd_kit = {}; }
let store_value = window.$fd_kit;
// {
//   status: {
//     isLoaded: false, 
//     pageNodeNum: 0,
//   },
//   utils: {
//     isVaryValue: null,
//     isComponentValue: null, 
//   },
//   elems: {
//     root: null,
//   },
// };

export function globalWrite(keys,val){
  if (!keys) { return warnLog('injectGlobal keys不存在'); }
  
  let keyArr = keys.split('.');
  keyArr.forEach((key,idx)=>{
    if (!store_value[key]) { store_value[key] = {}; }
    
    if (idx===keyArr.length-1) { store_value[key] = val; }
    else { store_value = store_value[key]; }
  })
} 
export function globalRead(keys){
  if (!keys) { return warnLog('getGlobal keys不存在!'); }
  
  let keyArrs = keys.split('.');
  keyArrs.forEach((key,idx)=>{ store_value = store_value[key]; })
  return store_value;
} 


function init(){
  
  // 工具集合 
  globalWrite('utils.isVaryValue', isVaryValue);
  globalWrite('utils.isComponentValue', isComponentValue);
  // 元素集合 
  globalWrite('elems', {});
  // 状态集合 
  globalWrite('status.isLoaded', false);
} 


