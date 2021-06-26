/* ** 开发用的功能  
*/


export function devLog(...args){
  console.log('#fd dev: ', ...args);
} 
export function errLog(...args){
  console.log('#fd err: ', ...args);
  // 阻止代码继续执行 
  throw new Error('fd err'); 
} 
export function warnLog(...args){
  console.warn('#fd warn: ', ...args);
} 

