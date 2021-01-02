/* 编译器 
*/

import { 
  isVary, 
} from "../vary/Vary.js";
import deal_tag from "./deal_tag.js";
import deal_attrs from "./deal_attrs.js";
import deal_child from "./deal_child.js";


/* 处理 jsx 
  tag       tagNameStr|componentFn|vary 
  attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
  children  [ str|elem|arr|vary ] 
*/
function compiler(tag, attrs, ...children){
  console.log('# compiler', tag.toString().slice(0,9) );
  attrs = attrs ?? {};
  
  const { elem, isCpt, } = deal_tag(tag, attrs);
  
  if (!isCpt) {
    deal_attrs(elem, attrs);
  }
  
  children.forEach((itm,idx)=>{
    if (itm===undefined || itm===null) { return ; }
    
    // 处理字符串子节点：去掉空格&忽略空字符串 
    if (typeof itm === 'string' ) { 
      itm = itm.trim(); 
      if (itm.length===0) { return false; }
    }
  
    deal_child(elem, itm);
  })
  
  return elem;
}
if (!window.$fd_compile) { window.$fd_compile = compiler; }

export default compiler;




