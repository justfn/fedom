/** 可变量对象 
* @author  fsl 
* @time    时间值 
* -----------------------------
* @import   引入方式说明 
* @example  使用方式说明 
* -----------------------------
* @detail  
- 01 详细说明1 
* -----------------------------
* @todo  
- 1 代办事项1 
*/

/* 可变量类 
*/
export default class Vary {
  constructor(val) {
    this._value = val; 
    this._fns = []
  }
  
  get value(){ return this._value; }
  get = ()=>{ return this._value; }
  set = (fn)=>{
    let _v = null;
    this._fns.forEach(item=>{
      _v = item(fn);
    });
    this._value = _v;
  }
}

/* 是否为可变量对象 
*/
export function isVary(val){
  return val instanceof Vary;
}

/* 使用可变量 
*/
export function useVary(val){
  return new Vary(val);
}
