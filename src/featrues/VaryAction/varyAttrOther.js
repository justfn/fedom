
import { 
  isVaryValue, 
} from "../../utils/judge.js";


export function varyAttrOtherVal(fdNode, attrKey, varyAttr){
  if (!varyAttr) { return ; }
  
  varyAttr._add_set((params)=>{
    let {
      nxtTrimedValue, 
    } = params;
    
    console.log("000000000 ", fdNode )
    fdNode.realNode.setAttribute(attrKey, nxtTrimedValue);
  })
} 


