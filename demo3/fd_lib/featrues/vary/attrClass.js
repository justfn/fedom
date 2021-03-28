
import { isVary, } from "./Vary.js";
export function varyAttrClassStr(fNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let elem = fNode.realNode;
  let vl = varyAttr.get(false);
  varyAttr.$mounted_run(elem.className);
  varyAttr.$add_set((p_v, n_v)=>{
    elem.className = n_v;
    return [n_v];
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
  varyAttrItm.$add_set((p_v, n_v)=>{
    if (p_v!=='') { elem.classList.remove(p_v); }
    if (n_v!=='') { elem.classList.add(n_v); }
    return [n_v];
  }, elem.classList)
  return it;
} 


