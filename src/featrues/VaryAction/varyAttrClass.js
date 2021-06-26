
import { 
  isVaryValue, 
} from "../../utils/judge.js";
export function varyAttrClassStr(fdNode, varyAttr){
  if (!varyAttr) { return ; }
  
  let elem = fdNode.realNode;
  let vl = varyAttr.get(false);
  varyAttr._mounted_run(elem.className);
  varyAttr._add_set(({ nxtTrimedValue, })=>{
    elem.className = nxtTrimedValue;
  }, elem.className);
} 
export function varyAttrClassArr(fdNode, varyAttr){
  if (!varyAttr) { return ; }
  
  console.log('todo ');
} 
export function varyAttrClassAitm(fdNode, varyAttrItm){
  if (!isVaryValue(varyAttrItm)) { return varyAttrItm; }
  
  let elem = fdNode.realNode;
  let it = varyAttrItm.get(false);
  varyAttrItm._mounted_run(elem.classList);
  varyAttrItm._add_set(({ preTrimedValue, nxtTrimedValue })=>{
    if (preTrimedValue!=='') { elem.classList.remove(preTrimedValue); }
    if (nxtTrimedValue!=='') { elem.classList.add(nxtTrimedValue); }
  }, elem.classList)
  return it;
} 


