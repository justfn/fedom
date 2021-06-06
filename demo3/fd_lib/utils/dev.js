/* ** 开发用的功能  
*/

window.fd_dev_log = (...args)=>{
  console.log('#fedom_dev_tip:', ...args);
}

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

