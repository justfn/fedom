

import message from "../../config/message.js";
import diffValue from "../../utils/diffValue.js";
import {
  isVaryValue,
  isArrayValue,
  isEmptyValue,
  isNumberValue, 
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
    this._$$ = val; 
    this._trimValueFn =  trimFn ?? (v=>v); // 整理成最终返回值 
    this._$$Trimed = this._trimValueFn(val);
    this.__$$TrimedNxt = symbol_1; // 缓存下一次格式化的值,避免多次执行'_trimValueFn'函数  
    
    // VaryList 备份&跟踪 
    this._$$List = [
      // {
      //   $$: <val>,
      //   id: <udx>,
      // }
    ]; 
    this.initList();
    
    if (isVaryValue(val)) {
      val.watch((preV,nxtV,preVTrimed,nxtVTrimed)=>{
        this.set((pre_v)=>{
          return val;
        })
      })
    }
    
    this._mounteds = [];
    
    this._sets = [];
    this._listSets = [];
    this._watchs = [];
  }
  
  /* --------------------------------------------------------- 对外接口  */
  // 取值 
  get = (isOriginal=true)=>{ 
    if (isOriginal) { return this._$$; }
    
    return this._$$Trimed; 
  }
  get $$(){ return this.get(true); }
  // 设值  
  set = (setHandle, isLazy=true)=>{
    if (!this.isAlive) { return Promise.reject('sleeping'); }
    
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
      if (diffValue(pre_v, nxt_v)) { return ; }
      
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
    if (isVaryValue(nxt_v)) { this.initList(); }
    
    return Promise.resolve(nxt_v);
  }
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
  on = ()=>{ this.isAlive = true; }
  off = ()=>{ this.isAlive = false; }  
  kill = ()=>{
    this.isAlive = false; 
    // todo 待优化 
    for(let key in this){
      this[key] = null; 
    };
  }
  
  /* --------------------------------------------------------- 方法  */
  // 收集更新 
  add_set = (setRun, extra)=>{
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
  mounted_run = (...args)=>{
    this._mounteds.forEach((mountedFn,idx)=>{
      mountedFn(this.get(true), this.get(false), ...args);
    })
  }
  
  /* --------------------------------------------------------- list独有功能 */
  arr_item_id_num = -1;
  initList = ()=>{
    let list = this.get();
    if (!isArrayValue(list)) { return ; }
    
    this._$$List = list.map((itm,idx)=>{
      this.arr_item_id_num = idx;
      return {
        $$: itm, 
        id: idx,
      }
    })
  }
  insert = (insertRun)=>{
    let oldList = this.get();
    if (!isArrayValue(oldList)) { return console.warn('varyvalue: 非法调用'); }
    
    const [idx, lst] = insertRun(oldList);
    
    if (isEmptyValue(idx)) { idx = oldList.length; }
    this._listSets.forEach((listSetItm)=>{
      listSetItm({
        index: idx,
        list: lst,
      });
    })
    return Promise.resolve();
  }
  remove = (id, idx)=>{
    let oldList = this.get();
    if (!isArrayValue(oldList)) { return console.warn('varyvalue: 非法调用'); }
    let index = 0;
    
    if (!isEmptyValue(id)) { 
      console.log('id ===', id,  this._$$List );
      index = this._$$List.findIndex(itm=>{ return itm.id===id; }); 
    }
    idx = idx * 1;
    if (isNumberValue(idx)) { 
      console.log('idx ===', idx, this._$$List );
      index = idx; 
    }
    
    this._listSets.forEach((listSetItm)=>{
      listSetItm({
        index,
      });
    })
    return Promise.resolve();
  }
  // 收集更新-数组 
  add_list_set = (listSetRun)=>{
    this._listSets.push(({index, list, id})=>{
      listSetRun({
        index,
        list, 
      }) 
      
      let oldList = this.get();
      let newList = [...oldList];
      // 新增 
      if (list) { 
        newList.splice(index, 0, ...list); 
        let listBackup = list.map((itm,idx)=>{
          this.arr_item_id_num++;
          console.log( 'add', this.arr_item_id_num);
          return {
            $$: itm, 
            id: this.arr_item_id_num,
          }
        })
        this._$$List.splice(index, 0, ...listBackup); 
      }
      // 删除 
      else { newList.splice(index, 1); }
      this._$$ = newList;
    });
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


