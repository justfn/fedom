/* ** 处理只有组件上存在的属性 
*/
import config from "../../config/config.js";
import { 
  isFunctionValue, 
  isStringValue, 
  isAsyncValue, 
} from "../../utils/judge.js";

export default function componentAttrs(fNode){
  let refVal = fNode.attrs.ref;
  if (!refVal) { return ; }
  
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if ( isFunctionValue(refVal) ) { 
    refVal( fNode.context );
    return ;
  }
  
  if (isAsyncValue(refVal)) {
    refVal.resolve( fNode.context );
    return ;
  }
  
  console.log('todo: 不支持的 ref 类型', fNode.realNode, refVal);
} 



