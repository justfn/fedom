
import { isVary, } from "./Vary.js";
export function varyAttrClassStr(fNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let elem = fNode.realNode;
  let vl = varyAttr.get(false);
  varyAttr.$mounted_run(elem.className);
  varyAttr.$add_set(({ nxtTrimedValue, })=>{
    elem.className = nxtTrimedValue;
  }, elem.className);
} 
export function varyAttrClassArr(fNode, varyAttr){
  if (!varyAttr) { return ; }
  
  console.log('todo ');
} 
export function varyAttrClassAitm(fNode, varyAttrItm){
  if (!isVary(varyAttrItm)) { return varyAttrItm; }
  
  let elem = fNode.realNode;
  let it = varyAttrItm.get(false);
  varyAttrItm.$mounted_run(elem.classList);
  varyAttrItm.$add_set(({ preTrimedValue, nxtTrimedValue })=>{
    if (preTrimedValue!=='') { elem.classList.remove(preTrimedValue); }
    if (nxtTrimedValue!=='') { elem.classList.add(nxtTrimedValue); }
  }, elem.classList)
  return it;
} 


