/* ** 处理只有组件上存在的属性 
*/
import { 
  isFunctionValue, 
  isStringValue, 
  isAsyncValue, 
} from "../../utils/judge.js";

export default function componentAttrs(fdNode){
  let refVal = fdNode.attrs.ref;
  if (refVal) { 
    // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
    // ref={fn}
    if ( isFunctionValue(refVal) ) { 
      refVal( fdNode.context );
    }
    // ref={asyncValue}
    else if ( isAsyncValue(refVal) ) {
      refVal.resolve( fdNode.context );
    }
    else {
      console.log('todo: 不支持的 ref 类型', fdNode.realNode, refVal);
    }
  }
  
  // 组件节点标识 
  fdNode.realNode.setAttribute("data-fd-component","true")
} 



