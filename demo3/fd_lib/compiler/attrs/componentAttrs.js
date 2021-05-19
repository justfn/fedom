/* ** 处理只有组件上存在的属性 
*/
import config from "../../config/config.js";
import { 
  isFunctionValue, 
  isStringValue, 
  isRefValue, 
} from "../../utils/judge.js";

export default function componentAttrs(fNode){
  let refVal = fNode.attrs.ref;
  if (!refVal) { return ; }
  
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if ( isFunctionValue(refVal) ) { 
    refVal({
      node: fNode.realNode,
      ...fNode.context, 
    })
    return ;
  }
  
  if (isRefValue(refVal)) {
    refVal._resolve({
      node: fNode.realNode,
      ...fNode.context, 
    });
    return ;
  }
  
  console.log('todo: 不支持的 ref 类型', fNode.realNode, refVal);
  
  // // to_do
  // if ( isStringValue(refVal) ) {
  //   if ( fNode.nodeType===config.tag_types.function ) {
  //     fNode.context.refs[refVal] = ''
  //   }
  //   else if ( fNode.nodeType===config.tag_types.component ) {
  // 
  //   }
  // }
  
  // /* brance: __scopeId todo */
  // if (key==='__scope') {
  //   fNode.realNode.setAttribute(`data-fd_scope_id`, `fd_${val}`);
  //   continue; 
  // }
  
} 



