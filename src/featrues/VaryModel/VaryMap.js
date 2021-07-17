/* ** 一次性动态化对象的所有键值 
*/


import { Vary, VaryValue, } from "./VaryValue.js";

const global_config = {
  // 忽略的keys
  keys: [
    '$store',
    '$insert',
    '$remove',
    '$get',
    '$$',
    '$map',
    '$update',
    '$set',
  ],
};
function checkKey(key){
  if (global_config.keys.includes(key)) { 
    let errMsg = `#fd VaryMap key: ${key} is forbid, please replace it`;
    console.err(errMsg);
    throw errMsg;
  }
  return key;
} 
function mapKeys(mapVal={}, callback){
  callback = callback || function(v){ return v; };
  let newMap = {};
  for(let key in mapVal){
    let val = mapVal[key];
    val = callback(val, checkKey(key), mapVal);
    newMap[key] = val;
  };
  return newMap;
} 
function init(that, mapVal){
  mapKeys( mapVal, (val, key)=>{
    that[key] = VaryValue(val, (v)=>{
      return that.$store.func(val, key, mapVal); 
    }) 
  })
} 
function update(that, key, val){
  key = checkKey(key);
  that.$store.value[key] = val;
  if (!that[key]) {
    that[ key ] = VaryValue(val, (v)=>{
      return that.$store.func(val, key, that.$store.value);
    }); 
    return Promise.resolve();
  }
  
  
  return that[ key ].set((v)=>{ return val; })
} 
export class KeysVary {
  constructor(mapVal, itmTrimFn){
    this.$store = {
      value: mapVal,
      func: itmTrimFn,
    }
    init(this, mapVal, itmTrimFn);
  }
  
  /* --------------------------------------------------------- KITs  */
  /* --------------------------------------------------------- APIs  */
  $insert = (key, val)=>{ 
    return update(this, key, val);
  }
  $remove = (key)=>{ 
    return this[key].set(()=>{ return null; }).then(()=>{
      delete this[key];
      delete this.$store.value[key];
    })
  }
  $get = (isTrimed=false)=>{ 
    if (isTrimed) {
      return mapKeys(this.$store.value, (val, key)=>{
        return this.$sotre.func(val, key, this.$store.value);
      });
    }
    
    return this.$store.value;
  }
  get $$(){ return this.$get(false); }
  $map = (mapCallback)=>{
    let obj = this.$store.value;
    return mapKeys(obj, (val, key)=>{
      return mapCallback(val, this[key], key, obj)
    })
  }
  $update = (key, val)=>{
    return update(that, key, val);
  }
  $set = (newMap)=>{ 
    let currentObj = this.$store.value;
    mapKeys(currentObj, (val, key)=>{
      this.$remove(key);
    })
    mapKeys(newMap, (val, key)=>{
      this.$insert(key, val);
    })
  }
}

export function VaryMap(mapVal, itmTrimFn){
  itmTrimFn = itmTrimFn || function(val, key, obj){ return val; };
  const varyedObj = new KeysVary(mapVal, itmTrimFn);
  
  return varyedObj;
} 


