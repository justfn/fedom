/* ** 数组专用  
todo: 增加数组所有方法
*/

import { Vary, VaryValue, } from "./VaryValue.js";
import {
  isNumberValue, 
  isArrayValue, 
  isFunctionValue, 
  isEmptyValue, 
} from "../../utils/judge.js";

class ListId {
  constructor(idNum){
    this.value = idNum;
  }
}
const list_in_set_fns_key = Symbol('list_in_set_fns');
const list_rm_set_fns_key = Symbol('list_rm_set_fns');
export class ListVary extends Vary {
  constructor(val, initIdList, itmTrimFn, trimFn){
    super(val, trimFn)
    
    // VaryList 备份&跟踪 
    this._$$List = [
      // {
      //   $$: <val>,
      //   id: new ListId(idx),
      // }
    ]; 
    this._initList(initIdList);
    
    this._listItemTrimFn = itmTrimFn;
  }
  
  /* --------------------------------------------------------- DATAs  */
  [list_in_set_fns_key] = [];
  [list_rm_set_fns_key] = [];
  
  /* --------------------------------------------------------- KITs  */
  arr_item_id_num = -99;
  _initList = (initIdList)=>{
    this._$$List = this._$$.map((itm,idx)=>{
      this.arr_item_id_num = idx;
      return {
        $$: itm, 
        id: initIdList[idx],
      }
    })
  }
  _splice = (begin, num, list=[], updateIdList=[], trimList=[])=>{
    let bakList = list.map((itm,idx)=>{
      return {
        $$: itm, 
        id: updateIdList[idx],
      }
    })
    
    this._$$.splice(begin, num, ...list);
    this._$$Trimed.splice(begin, num, ...trimList);
    this._$$List.splice(begin, num, ...bakList);
  }
  _isItmIdValue = (val)=>{
    if ( !val ) { return false; }
    if ( val instanceof ListId ) { return true; }
    
    return false;
  }
  _findIdx = (id)=>{
    let idx = this._$$List.findIndex( 
      itm=>itm.id===id 
    ); 
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
  $insert = (insertRunOrItmidOrIdx, lst)=>{
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
    
    let updateIdList = [];
    let trimList = lst.map((itm, idx1)=>{
      this.arr_item_id_num++;
      let itmId = new ListId( this.arr_item_id_num );
      updateIdList.push(itmId);
      return this._listItemTrimFn( itm, idx, itmId, this._$$);
    })
    this[list_in_set_fns_key].forEach((listInSetItm)=>{
      listInSetItm({
        index: idx,
        list: trimList,
      });
    })
    this._splice(idx, 0, lst, updateIdList, trimList);
    return Promise.resolve();
  }
  $remove = (removeRunOrItmidOrIdx)=>{
    let idx = removeRunOrItmidOrIdx;
    if (isFunctionValue(removeRunOrItmidOrIdx)) {
      idx = removeRunOrItmidOrIdx([...this._$$]);
    }
    else if (this._isItmIdValue(removeRunOrItmidOrIdx)) {
      idx = this._findIdx(removeRunOrItmidOrIdx)
    }
    idx = this._checkIdx(idx);
    
    this[list_rm_set_fns_key].forEach((listRmSetItm)=>{
      listRmSetItm({
        index: idx,
      });
    })
    this._splice(idx, 1);
    return Promise.resolve();
  }
  $update = (updateRunOrItmidOrIdx, val)=>{
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
    
    return this.$remove( idx )
    .then(()=>{
      return this.$insert( idx, [val] );
    })
  }
  $slice = (startIdxOrId, endIdxOrId)=>{
    let startIdx = startIdxOrId;
    let endIdx = endIdxOrId;
    if (this._isItmIdValue(startIdxOrId)) { startIdx = this._findIdx(startIdxOrId); }
    if (this._isItmIdValue(endIdxOrId)) { endIdx = this._findIdx(endIdxOrId); }
    startIdx = this._checkIdx(startIdx);
    endIdx = this._checkIdx(endIdx);
    if (startIdx>=endIdx) { throw 'fd VaryList slice start is bigger than end' }
    
    let promiseList = [];
    let lenEnd = this.$$.length - endIdx;
    if (lenEnd>0) {
      Array(lenEnd).fill('').forEach((itm,idx)=>{
        promiseList.push( this.$remove(endIdx) )
      })
    }
    let lenStart = startIdx - 0; 
    if (lenStart>0) {
      Array(lenStart).fill('').forEach((itm,idx)=>{
        promiseList.push( this.$remove(0) )
      })
    }
    
    return Promise.all( promiseList )
  }
  $unshift = (...list)=>{
    return this.$insert(0, list)
    .then(()=>{
      return this.$$.length;
    })
  }
  $push = (...list)=>{
    return this.$insert(this.$$.length, list)
    .then(()=>{
      return this.$$.length;
    })
  }
  $shift = ()=>{
    if (this.$$.length===0) { return Promise.resolve(); }
    
    let firstItm = this.$$[0];
    return this.$remove(0).then(()=>{
      return firstItm;
    })
  }
  $pop = ()=>{
    if (this.$$.length===0) { return Promise.resolve(); }
    
    let lastItm = this.$$[this.$$.length-1];
    return this.$remove(this.$$.length-1)
    .then(()=>{
      return lastItm;
    })
  }
  $map = (forEachRun)=>{
    forEachRun = forEachRun || function(){ };
    
    return this._$$List.map((itm, idx, list)=>{
      return forEachRun(itm.$$, idx, itm.id, list)
    })
  }
  $set = ()=>{
    // todo 
  }
  // 收集更新-插入 
  _add_list_in = (listInSetRun)=>{
    this[list_in_set_fns_key].push(({index, list, id})=>{
      listInSetRun({
        index,
        list, 
      }) 
    });
  } 
  // 收集更新-删除
  _add_list_rm = (listRemoveRun)=>{
    this[list_rm_set_fns_key].push(({index})=>{
      listRemoveRun({
        index,
      }) 
    });
  } 
}


export function VaryList(list, itmTrimFn){
  if (!isArrayValue(list)) { return console.error('fd: 非 List, 不可使用 VaryList'); }
  
  itmTrimFn = itmTrimFn || function(val, idx, id, list){ return val; }
  
  let initIdList = [];
  let trimedList = list.map((itm, idx)=>{
    let itmId = new ListId(idx);
    initIdList.push(itmId);
    return itmTrimFn(itm, idx, itmId, list);
  });
  const varyedList = new ListVary(list, initIdList, itmTrimFn, (lst)=>{
    return trimedList;
  });
  
  return varyedList;
} 

