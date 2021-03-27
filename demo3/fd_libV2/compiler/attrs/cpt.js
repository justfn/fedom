

/* 处理组件 */
function deal_cpt(elem, attrs, context){
  // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
  if (attrs.ref) {
    // deal_ref_callback(elem, attrs.ref);
    attrs.ref({
      ...context, 
      $elem: elem,
    })
  }
} 
export {
  deal_cpt,
};

