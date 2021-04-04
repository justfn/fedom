
/* 处理文本值节点
*/

import { 
  isEmptyValue, 
} from "../../utils/judge.js";

export default function trimTextChild(val){
  if (isEmptyValue(val)) { return ''; }
  
  let rst = val+'';
  // 去掉空格 
  return rst.trim();
} 

