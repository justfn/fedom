/* ** 一次性动态化对象的所有键值 
*/


import { VaryValue, } from "./Vary.js";

const global_config = {
  // 忽略的keys
  keys: [
    '$$',
    'get',
    'set',
    'mounted',
    'watch',
    'on',
    'off',
    'kill',
    'add_set',
    'mounted_run',
  ],
};
export default function VaryKeys(obj){
  const varyedObj = VaryValue(obj);
  
  for(var key in obj){
    if (global_config.keys.includes(key)) { continue; }
    varyedObj[key] = VaryValue(obj[key]);
  };
  
  return varyedObj;
} 

