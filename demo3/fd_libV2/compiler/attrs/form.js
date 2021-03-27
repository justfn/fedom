import { isVary, } from "../../featrues/vary/Vary.js";

/* 处理表单元素 */
function is_form_elems(node){
  let nodeName = node.nodeName ?? '';
  nodeName = nodeName.toLowerCase();
  return ['input'].includes(nodeName);
};
function deal_form_elems(elem,key,val){
  // 处理 input value 
  if (elem.nodeName.toLowerCase()==='input' && key==='value') {
    let inputVal = val;
    if (isVary(val)) {
      inputVal = val.get(false);
      val.$add_set((p_v,n_v)=>{
        elem.value = n_v;
        return [n_v];
      })
      elem.addEventListener("input",function(evt){
        let value = evt.currentTarget.value; 
        val.set((pre_v)=>{
          return value;
        })
      })
    }
    elem.setAttribute("value",inputVal)
  }
} 

export {
  is_form_elems,
  deal_form_elems,
};

