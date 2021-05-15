/* ** 数组专用  
*/

import { Vary, VaryValue, } from "./Vary.js";
import {
  isNumberValue, 
  isArrayValue, 
  isFunctionValue, 
  isEmptyValue, 
} from "../../utils/judge.js";

export class ListVary extends Vary {
  constructor(val, itmTrimFn, trimFn){
    super(val, trimFn)
    
    // VaryList 备份&跟踪 
    this._$$List = [
      // {
      //   $$: <val>,
      //   id: <idx>,
      // }
    ]; 
    this.initList();
    
    this._listInSets = [];
    this._listRmSets = [];
    this._listItemTrimFn = itmTrimFn;
  }
  
  arr_item_id_num = -99;
  initList = ()=>{
    this._$$List = this._$$.map((itm,idx)=>{
      this.arr_item_id_num = idx;
      return {
        $$: itm, 
        id: `id_${idx}`,
      }
    })
  }
  
  /* --------------------------------------------------------- KITs  */
  _splice = (begin, num, list=[], trimList=[])=>{
    let bakList = list.map((itm,idx)=>{
      this.arr_item_id_num++;
      return {
        $$: itm, 
        id: `id_${this.arr_item_id_num}`,
      }
    })
    
    this._$$.splice(begin, num, ...list);
    this._$$Trimed.splice(begin, num, ...trimList);
    this._$$List.splice(begin, num, ...bakList);
  }
  _isItmIdValue = (val)=>{
    if (!val) { return false; }
    if (!val.startsWith) { return false; }
    if (!val.startsWith('id_')) { return false; }
    
    return true;
  }
  _findIdx = (id)=>{
    let idx = this._$$List.findIndex( itm=>itm.id===id ); 
    if (idx===-1) { throw 'fd VaryList id 错误'; }
    
    return idx;
  }
  _checkIdx = (idx)=>{
    if (isEmptyValue(idx)) { idx = 0 } 
    if (!isNumberValue(idx)) { throw 'fd VaryList idx 错误'; }
    if (idx>this._$$.length) { idx = this._$$.length }
    if (idx<0) { idx = 0 }
    
    return idx;
  }
  /* --------------------------------------------------------- APIs  */
  insert = (insertRunOrItmidOrIdx, lst)=>{
    let idx = insertRunOrItmidOrIdx;
    if (isFunctionValue(insertRunOrItmidOrIdx)) {
      let result = insertRunOrItmidOrIdx([...this._$$]);
      idx = result[0];
      lst = result[1];
    }
    else if ( this._isItmIdValue(insertRunOrItmidOrIdx)) {
      idx = this._findIdx(insertRunOrItmidOrIdx)
    }
    idx = this._checkIdx(idx);
    
    let trimList = lst.map((itm,idx)=>{
      let itmId = `id_${this.arr_item_id_num+idx+1}`
      return this._listItemTrimFn( itm, idx, itmId, this._$$);
    })
    this._listInSets.forEach((listInSetItm)=>{
      listInSetItm({
        index: idx,
        list: trimList,
      });
    })
    this._splice(idx, 0, lst, trimList);
    return Promise.resolve();
  }
  remove = (removeRunOrItmidOrIdx)=>{
    let idx = removeRunOrItmidOrIdx;
    if (isFunctionValue(removeRunOrItmidOrIdx)) {
      idx = removeRunOrItmidOrIdx([...this._$$]);
    }
    else if (this._isItmIdValue(removeRunOrItmidOrIdx)) {
      idx = this._findIdx(removeRunOrItmidOrIdx)
    }
    idx = this._checkIdx(idx);
    
    this._listRmSets.forEach((listRmSetItm)=>{
      listRmSetItm({
        index: idx,
      });
    })
    this._splice(idx, 1);
    return Promise.resolve();
  }
  update = (updateRunOrItmidOrIdx, val)=>{
    let idx = updateRunOrItmidOrIdx;
    if (isFunctionValue(updateRunOrItmidOrIdx)) {
      let result = updateRunOrItmidOrIdx([...this._$$]);
      idx = result[0];
      val = result[1];
    }
    else if (this._isItmIdValue(updateRunOrItmidOrIdx)) {
      idx = this._findIdx(updateRunOrItmidOrIdx)
    }
    idx = this._checkIdx(idx);
    
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", idx, val)
    this.remove( idx );
    this.insert( idx, [val] );
    
    return Promise.resolve();
  }
  // 收集更新-插入 
  add_list_in = (listInSetRun)=>{
    this._listInSets.push(({index, list, id})=>{
      listInSetRun({
        index,
        list, 
      }) 
    });
  } 
  // 收集更新-删除
  add_list_rm = (listRemoveRun)=>{
    this._listRmSets.push(({index})=>{
      listRemoveRun({
        index,
      }) 
    });
  } 
}

export function VaryList(list, itmTrimFn){
  if (!isArrayValue(list)) { return console.error('fd: 非 List, 不可使用 VaryList'); }
  
  itmTrimFn = itmTrimFn || function(val, idx, id, list){ return val; }
  const varyedList = new ListVary(list, itmTrimFn, (lst)=>{
    return list.map((itm,idx)=>{
      return itmTrimFn(itm, idx, `id_${idx}`, list);
    });
  });
  
  
  return varyedList;
} 

