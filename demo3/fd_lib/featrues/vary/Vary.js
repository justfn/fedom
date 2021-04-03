

import message from "../../message.js";
import {
  isVary,
} from "../../utils/judge.js";


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
const symbol_1 = Symbol('cache_value'); // 唯一标识1 
export default class Vary {
  constructor(val, trimFn, nId) {
    this._num_id = nId ?? NaN;
    
    this.isAlive = true; 
    this._value = val; 
    this._trimValueFn =  trimFn ?? (v=>v); // 整理成最终返回值 
    this._valueTrimed = this._trimValueFn(val);
    this._nodeValuePatch = null; // 节点补偿值 
    this.__valueTrimedNxt = symbol_1; // 缓存下一次格式化的值,避免多次执行'_trimValueFn'函数  
    if (isVary(val)) {
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
    if (isOriginal) { return this._value; }
    
    return this._valueTrimed; 
  }
  get value(){ return this.get(true); }
  // 设值  
  set = (setHandle, isLazy=true)=>{
    if (!this.isAlive) { return Promise.reject('sleeping'); }
    
    let pre_v = this.get(true);
    let pre_v_t = this.get(false);
    let nxt_v = null;
    if (!isLazy) { 
      this._sets.forEach(setFn=>{ 
        nxt_v = setFn(setHandle, isLazy).nextValue; 
      });
    }
    else {
      nxt_v = setHandle(pre_v, pre_v_t); 
      this.__valueTrimedNxt = this._trimValueFn(nxt_v);
      this._sets.forEach(setFn=>{ 
        setFn(nxt_v, isLazy); 
      });
    }
    this._value = nxt_v;
    let tmpV = this._valueTrimed;
    this._valueTrimed = this.__valueTrimedNxt;
    this.__valueTrimedNxt = symbol_1; 
    this._watchs.forEach( watchFn=>{
      watchFn(pre_v, nxt_v, tmpV, this._valueTrimed);
    })
    return Promise.resolve(nxt_v);
  }
  set value(val){ this.set(v=>val, true) }
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
  on = ()=>{ this.isAlive = true; }
  off = (isDied=false)=>{ 
    if (isDied) {
      // todo 待优化 
      for(let key in this){
        this[key] = null; 
      };
    }
    else {
      this.isAlive = false; 
    }
  }  
  
  /* --------------------------------------------------------- 工具方法  */
  /* ** 补偿更新Node节点  
  1 设置文本字符串作为子节点时,初始渲染后,第二次更新无法通过文本定位该文本节点 
  需在首次渲染后,将文本节点进行补偿替换 
  2 空数组子节点首次渲染时,将无实体节点插入,使用注释节点占位,该注释节点作为补偿节点存储 
  */
  $patchNode = (val)=>{
    this._nodeValuePatch = val;
  }
  // 收集更新 
  $add_set = (setRun, extra)=>{
    this._sets.push((setVal, isLazy)=>{
      let pre_v = this.get(true);
      let pre_v_t = this.get(false);
      let nxt_v = setVal; 
      if (!isLazy) { 
        nxt_v = setVal(pre_v, pre_v_t, extra); 
        if (this.__valueTrimedNxt===symbol_1) {
          this.__valueTrimedNxt = this._trimValueFn(nxt_v);
        }
      }
      let {
        patch_value = null, // 补偿值 
      } = setRun({
        preTrimedValue: pre_v_t,
        nxtTrimedValue: this.__valueTrimedNxt,
        patchNodeValue: this._nodeValuePatch,
        preValue: pre_v,
        nxtValue: nxt_v,
        extra: extra,
      }) || {};
      if ( patch_value ) { this._nodeValuePatch = patch_value; }
      return {
        ...extra,
        nextValue: nxt_v,
      };
    });
  }
  // 执行初始化 
  $mounted_run = (...args)=>{
    this._mounteds.forEach((mountedFn,idx)=>{
      mountedFn(this.get(true), this.get(false), ...args);
    })
  }
}

/* 使用可变量 
*/
let use_vary_num_id = 0; 
export function VaryValue(val, trimFn){
  // console.log( use_vary_num_id );
  const varyVal = new Vary(val, trimFn, use_vary_num_id++);
  return varyVal;
}


