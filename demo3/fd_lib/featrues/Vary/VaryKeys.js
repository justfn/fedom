/* ** 一次性动态化对象的所有键值 
*/


import { Vary, VaryValue, } from "./Vary.js";
import { 
  isVaryValue, 
} from "../../utils/utils.js";

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
    'update',
  ],
};

export class KeysVary extends Vary {
  constructor(val, itmTrimFn, trimFn){
    super(val, trimFn);
    
    this._KeysItemTrimFn = itmTrimFn; 
    this._init_();
  }
  
  /* --------------------------------------------------------- KITs  */
  _init_ = ()=>{
    mapKeys( this._$$, (val, key)=>{
      this[key] = val; 
      return val;
    })
  }
  /* --------------------------------------------------------- APIs  */
  $update = (key, val)=>{
    let vVal = this[key]; 
    if (!isVaryValue(vVal)) { throw 'fd VaryKeys update error: is not VaryValue' }
    
    return vVal.set((preV)=>{
      return val;
    });
  }
}

export function VaryKeys(keysVal, itmTrimFn){
  itmTrimFn = itmTrimFn || function(val, key, keys01){ return val; };
  const varyedObj = new KeysVary(keysVal, itmTrimFn, (keys02)=>{
    return mapKeys(keys02, (val, key, keys03)=>{
      return itmTrimFn(val, key, keys03);
    });
  });
  
  return varyedObj;
} 

function mapKeys(keysVal={}, callback){
  callback = callback || function(){ };
  let newKeys = {};
  for(let key in keysVal){
    let val = keysVal[key];
    let key_ = key; 
    if (global_config.keys.includes(key)) { 
      key_ = `${key}_`
      console.warn(`fd VaryKeys key: ${key} is forbid, has replace with: ${key_}`);
    }
    val = callback(val, key_, keysVal);
    newKeys[key_] = VaryValue(val);
  };
  return newKeys;
} 

