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
  
  arr_item_id_num = -1;
  initList = ()=>{
    this._$$List = this._$$.map((itm,idx)=>{
      this.arr_item_id_num = idx;
      return {
        $$: itm, 
        id: idx,
      }
    })
  }
  
  /* --------------------------------------------------------- KITs  */
  _splice = (begin,num,lst=[], trimList=[])=>{
    let bakList = lst.map((itm,idx)=>{
      this.arr_item_id_num++;
      // console.log( 'add', this.arr_item_id_num);
      return {
        $$: itm, 
        id: this.arr_item_id_num,
      }
    })
    
    this._$$.splice(begin, num, ...lst);
    this._$$Trimed.splice(begin, num, ...trimList);
    this._$$List.splice(begin, num, ...bakList);
  }
  /* --------------------------------------------------------- APIs  */
  insert = (insertRunOrIdx, lst)=>{
    let idx = insertRunOrIdx;
    if (isFunctionValue(insertRunOrIdx)) {
      let result = insertRunOrIdx([...this._$$]);
      idx = result[0];
      lst = result[1];
    }
    if (isEmptyValue(idx)) { idx = this._$$.length; }
    
    let trimList = lst.map((itm,idx)=>{
      return this._listItemTrimFn(this.arr_item_id_num+idx+1, itm, idx, this._$$);
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
  remove = (removeRunOrId, idx)=>{
    let id = removeRunOrId; 
    if (isFunctionValue(removeRunOrId)) {
      let result = removeRunOrId([...this._$$]);
      id = result[0]; 
      idx = result[1];
    }
    
    let index = 0;
    if (!isEmptyValue(id)) { 
      index = this._$$List.findIndex(itm=>{ return itm.id===id; }); 
    }
    if (isNumberValue(idx)) { index = idx; }
    
    if (index>this._$$.length-1 || index<0) { return console.error('fd: VaryList delete out of limit '); }
    
    this._listRmSets.forEach((listRmSetItm)=>{
      listRmSetItm({
        index,
      });
    })
    this._splice(index, 1);
    return Promise.resolve();
  }
  update = (updateRunOrIdx, val)=>{
    let idx = updateRunOrIdx;
    if (isFunctionValue(updateRunOrIdx)) {
      let result = updateRunOrIdx([...this._$$]);
      idx = result[0];
      val = result[1];
    }
    
    this.insert(()=>{ return [ idx, [val]]; })
    this.remove(()=>{ return [ null, idx ]; });
    
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
  
  itmTrimFn = itmTrimFn || function(id, val){ return val; }
  const varyedList = new ListVary(list, itmTrimFn, (lst)=>{
    return list.map((itm,idx)=>{
      return itmTrimFn(idx, itm, idx, list);
    });
  });
  
  
  return varyedList;
} 

