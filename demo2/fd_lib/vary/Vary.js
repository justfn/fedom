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
    this._updates = []
  }
  
  /* 对外接口 */
  get = ()=>{ return this._value; }
  set = (changeHandle, isLazy=true)=>{
    let nxt_v = null;
    if (isLazy) { 
      nxt_v = changeHandle(this.get()); 
      this._updates.forEach(update=>{ update(isLazy, nxt_v); });
    }
    else {
      this._updates.forEach(update=>{ nxt_v = update(isLazy, changeHandle); });
    }
    this._value = nxt_v;
  }
  get value(){ return this._value; }
  set value(val){ this.set(v=>val, true) }
  
  /* 工具方法 */
  // 收集更新 
  $add_update = (updateFn, ...moreInfo)=>{
    this._updates.push((isLazy, arg)=>{
      let pre_v = this.get();
      let nxt_v = arg; 
      if (!isLazy) { nxt_v = arg(pre_v, ...moreInfo); }
      updateFn(pre_v,nxt_v);
      return nxt_v;
    })
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
