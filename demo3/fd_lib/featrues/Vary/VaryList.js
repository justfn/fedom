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
  constructor(val, trimFn){
    super(val, trimFn)
    
    // VaryList 备份&跟踪 
    this._$$List = [
      // {
      //   $$: <val>,
      //   id: <idx>,
      // }
    ]; 
    this.initList();
    
    this._listSets = [];
  }
  
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
  
  insert = (insertRunOrIdx, lst)=>{
    let oldList = this.get();
    if (!isArrayValue(oldList)) { return console.warn('varyvalue: 非法调用'); }
    
    let idx = insertRunOrIdx;
    if (isFunctionValue(insertRunOrIdx)) {
      let result = insertRunOrIdx(oldList);
      idx = result[0];
      lst = result[1];
    }
    
    if (isEmptyValue(idx)) { idx = oldList.length; }
    this._listSets.forEach((listSetItm)=>{
      listSetItm({
        index: idx,
        list: lst,
      });
    })
    return Promise.resolve();
  }
  remove = (removeRunOrId, idx)=>{
    let oldList = this.get();
    if (!isArrayValue(oldList)) { return console.warn('varyvalue: 非法调用'); }
    let index = 0;
    
    let id = removeRunOrId; 
    if (isFunctionValue(removeRunOrId)) {
      let result = removeRunOrId(oldList);
      id = result[0]; 
      idx = result[1];
    }
    
    
    if (!isEmptyValue(id)) { 
      // console.log('id ===', id,  this._$$List );
      index = this._$$List.findIndex(itm=>{ return itm.id===id; }); 
    }
    idx = idx * 1;
    if (isNumberValue(idx)) { 
      // console.log('idx ===', idx, this._$$List );
      index = idx; 
    }
    
    this._listSets.forEach((listSetItm)=>{
      listSetItm({
        index,
      });
    })
    return Promise.resolve();
  }
  update = (updateRun)=>{
    let oldList = this.get();
    if (!isArrayValue(oldList)) { return console.warn('varyvalue: 非法调用'); }
    
    let [ idx, val ] = updateRun(oldList);
    this.insert(()=>{ return [ idx, [val]]; })
    this.remove(()=>{ return [ null, idx ]; });
    
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

export function VaryList(list, trimFn){
  const varyedList = new ListVary(list, trimFn);
  
  
  return varyedList;
} 

