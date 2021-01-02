/* 编译器 
*/

import { 
  isVary, 
} from "../vary/Vary.js";
import deal_tag from "./deal_tag.js";
import deal_attrs from "./deal_attrs.js";
import deal_child from "./deal_child.js";


/* 处理 jsx 
  执行顺序 & 深度优先 
  tag       tagNameStr|componentFn|vary 
  attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
  children  [ str|elem|arr|vary ] 
*/
let refObj = {};
window._scope_id = 1; // 组件编译scope标识 todo 
console.log('##### compiler ');
function compiler(tag, attrs, ...children){
  attrs = attrs ?? {};
  
  const { 
    elem, 
    isCpt, 
    mountedFns, 
  } = deal_tag(tag, attrs, null);
  
  let {
    refKV, 
  } = deal_attrs(elem, attrs, isCpt );
  Object.assign(refObj, refKV);
  
  children.forEach(child=>{
    if (child===undefined || child===null) { return ; }
    
    // 处理字符串子节点：去掉空格&忽略空字符串 
    if (typeof child === 'string' ) { 
      child = child.trim(); 
      if (child.length===0) { return ; }
    }
    
    deal_child(elem, child, null, isCpt);
  })
  
  console.log('# compiler', tag, elem );
  
  mountedFns.forEach((mountedFn,idx)=>{
    mountedFn({
      root: elem, 
      refs: {
        ...refObj,
      },
    });
  })
  return elem;
}
if (!window.$fd_compile) { window.$fd_compile = compiler; }

export default compiler;




