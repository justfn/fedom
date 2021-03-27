import { isVary, } from "../../featrues/vary/Vary.js";

/* 处理表单元素 */
export function isFormNode(node){
  let nodeName = node.nodeName ?? '';
  nodeName = nodeName.toLowerCase();
  return ['input'].includes(nodeName);
};
export function addFormAttrs(elem,key,val){
  // 处理 input value 
  if (elem.nodeName.toLowerCase()==='input' && key==='value') {
    let inputVal = val;
    
    /* Features: 
    */
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


