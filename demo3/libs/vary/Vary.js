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
  constructor(val, nId) {
    this._num_id = nId ?? NaN;
    this._value = val; 
    this._mounteds = [];
    this._updates = [];
  }
  
  /* 对外接口 */
  // 取值 
  get = ()=>{ return this._value; }
  get value(){ return this._value; }
  // 设值  
  set = (setHandle, thenHandle, isLazy=true)=>{
    thenHandle = thenHandle ?? (a=>null);
    let nxt_v = null;
    if (isLazy) { 
      nxt_v = setHandle(this.get()); 
      this._updates.forEach(update=>{ update(nxt_v, isLazy); });
    }
    else {
      this._updates.forEach(update=>{ nxt_v = update(setHandle, isLazy); });
    }
    this._value = nxt_v;
    thenHandle(nxt_v);
  }
  set value(val){ this.set(v=>val, null, true) }
  // 收集渲染后执行的函数   
  mounted = (fn)=>{
    this._mounteds.push(fn);
  }
  
  
  /* 工具方法 */
  // 收集更新 
  $add_update = (updateRun, ...moreInfo)=>{
    this._updates.push((setVal, isLazy)=>{
      let pre_v = this.get();
      let nxt_v = setVal; 
      if (!isLazy) { nxt_v = setVal(pre_v, ...moreInfo); }
      updateRun(pre_v, nxt_v);
      return nxt_v;
    });
  }
  // 执行初始化 
  $mounted_run = (...args)=>{
    this._mounteds.forEach((mountedFn,idx)=>{
      mountedFn(this.get(),...args);
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
let use_vary_num_id = 0; 
export function useVary(val){
  // console.log( use_vary_num_id );
  const varyVal = new Vary(val, use_vary_num_id++);
  return varyVal;
}

