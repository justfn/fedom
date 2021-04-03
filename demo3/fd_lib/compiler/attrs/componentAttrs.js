/* ** 处理只有组件上存在的属性 
*/

import { isFunctionValue, } from "../../utils/judge.js";

export default function componentAttrs(fNode){
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if ( isFunctionValue(fNode.attrs.ref) ) { 
    fNode.attrs.ref(fNode)
  }
  
  // /* brance: __scopeId todo */
  // if (key==='__scope') {
  //   fNode.realNode.setAttribute(`data-fd_scope_id`, `fd_${val}`);
  //   continue; 
  // }
  
} 



