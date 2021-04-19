/* ** 处理只有组件上存在的属性 
*/
import config from "../../config/config.js";
import { 
  isFunctionValue, 
  isStringValue, 
} from "../../utils/judge.js";

export default function componentAttrs(fNode){
  let refVal = fNode.attrs.ref;
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if ( isFunctionValue(refVal) ) { 
    refVal({
      node: fNode.realNode,
      ...fNode.context, 
      ...fNode.instance, 
    })
  }
  
  
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



