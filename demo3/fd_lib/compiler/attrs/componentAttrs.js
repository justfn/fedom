/* ** 处理只有组件上存在的属性 
*/

export default function componentAttrs(fNode){
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if (typeof fNode.attrs.ref !== 'function') { return ; }
  
  attrs.ref(fNode)
} 



