/* 注入全局变量方便存储及使用 
*/

if (!window.$fd) {  window.$fd = {
  status: {
    isLoaded: false, 
    pageNodeNum: 0,
  },
  compiler: null, 
  render: null, 
  Router: null,
  VaryValue: null,
  Component: null, 
  utils: {
    isVaryValue: null,
    isComponent: null, 
  },
  elems: {
    root: null,
  },
};}

export function globalWrite(keys,val){
  if (!keys) { return log('#warn: injectGlobal keys不存在'); }
  
  let keyArr = keys.split('.');
  let current = window.$fd;
  keyArr.forEach((key,idx)=>{
    if (!current[key]) { current[key] = {}; }
    
    if (idx===keyArr.length-1) { current[key] = val; }
    else { current = current[key]; }
  })
} 
export function globalRead(keys){
  if (!keys) { return log('#warn getGlobal keys不存在!'); }
  
  let keyArrs = keys.split('.');
  let result = window.$fd;
  keyArrs.forEach((key,idx)=>{ result = result[key]; })
  return result;
} 

