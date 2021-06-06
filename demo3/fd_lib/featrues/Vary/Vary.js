

import diffValue from "../../utils/diffValue.js";
import {
  isVaryValue,
  isArrayValue,
  isEmptyValue,
  isNumberValue, 
} from "../../utils/judge.js";
import { errLog, } from "../../utils/dev.js";


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
let use_vary_num_id = 0; 
const symbol_1 = Symbol('cache_value'); // 唯一标识1 
export class Vary {
  constructor(val, trimFn) {
    this._num_id = use_vary_num_id++;
    
    this._isAlive = true; 
    this._$$ = val; 
    this._trimValueFn =  trimFn ?? (v=>v); // 整理成最终返回值 
    this._$$Trimed = this._trimValueFn(val);
    this.__$$TrimedNxt = symbol_1; // 缓存下一次格式化的值,避免多次执行'_trimValueFn'函数  
    
    
    if (isVaryValue(val)) {
      val.watch((preV,nxtV,preVTrimed,nxtVTrimed)=>{
        this.set((pre_v)=>{
          return val;
        })
      })
    }
    
    this._mounteds = [];
    
    this._sets = [];
    this._watchs = [];
  }
  
  /* --------------------------------------------------------- 对外接口  */
  // 取值 
  get = (isOriginal=true)=>{ 
    if (isOriginal) { return this._$$; }
    
    return this._$$Trimed; 
  }
  // 设值  
  set = (setHandle, isLazy=true)=>{
    if (!this._isAlive) { return Promise.reject('sleeping'); }
    
    let pre_v = this.get(true);
    let pre_v_t = this.get(false);
    let nxt_v = null;
    if (!isLazy) { 
      // todo; diff value 
      this._sets.forEach(setFn=>{ 
        nxt_v = setFn(setHandle, isLazy).nextValue; 
      });
    }
    else {
      nxt_v = setHandle(pre_v, pre_v_t); 
      // diff nxt_v pre_v 
      if (diffValue(pre_v, nxt_v)) { return Promise.resolve(); }
      
      if (nxt_v===undefined) { nxt_v = pre_v }
      this.__$$TrimedNxt = this._trimValueFn(nxt_v);
      this._sets.forEach(setFn=>{ 
        setFn(nxt_v, isLazy); 
      });
    }
    this._$$ = nxt_v;
    let tmpV = this._$$Trimed;
    this._$$Trimed = this.__$$TrimedNxt;
    this.__$$TrimedNxt = symbol_1; 
    this._watchs.forEach( watchFn=>{
      watchFn(pre_v, nxt_v, tmpV, this._$$Trimed);
    })
    
    // VaryList 处理 
    if (isVaryValue(nxt_v)) { this.initList && this.initList(); }
    
    return Promise.resolve(nxt_v);
  }
  get $$(){ return this.get(true); }
  set $$(val){ this.set(v=>val, true) }
  // 收集渲染后执行的函数 
  mounted = (mountedHandle)=>{
    this._mounteds.push(mountedHandle);
  }
  // 收集更新时执行的函数 
  watch = (watchHandle)=>{
    this._watchs.push((p_v, n_v, pVTrimed, nVTrimed)=>{
      watchHandle(p_v, n_v, pVTrimed, nVTrimed);
    })
  }
  // 控制开关 
  on = ()=>{ this._isAlive = true; }
  off = ()=>{ this._isAlive = false; }  
  kill = ()=>{
    this._isAlive = false; 
    // todo 待优化 
    for(let key in this){
      this[key] = null; 
    };
  }
  
  /* --------------------------------------------------------- 方法  */
  // 收集更新 
  _add_set = (setRun, extra)=>{
    this._sets.push((setHandle, isLazy)=>{
      let pre_v = this.get(true);
      let pre_v_t = this.get(false);
      let nxt_v = setHandle; 
      if (!isLazy) { 
        nxt_v = setHandle(pre_v, pre_v_t, extra); 
        if (nxt_v===undefined) { nxt_v = pre_v }
        if (this.__$$TrimedNxt===symbol_1) {
          this.__$$TrimedNxt = this._trimValueFn(nxt_v);
        }
      }
      let updatedReturenValue = setRun({
        preTrimedValue: pre_v_t,
        nxtTrimedValue: this.__$$TrimedNxt,
        preValue: pre_v,
        nxtValue: nxt_v,
        extra: extra,
      }) || {};
      return {
        ...extra,
        nextValue: nxt_v,
      };
    });
  }
  // 执行初始化 
  _mounted_run = (...args)=>{
    this._mounteds.forEach((mountedFn,idx)=>{
      mountedFn(this.get(true), this.get(false), ...args);
    })
  }
  
}

/* 使用可变量 
*/
const err_log1 = 'error arguments of VaryValue';
export function VaryValue(val, trimFn){
  if ( isVaryValue(val) ) { errLog(err_log1, val); }
  
  const varyVal = new Vary(val, trimFn);
  return varyVal;
}


