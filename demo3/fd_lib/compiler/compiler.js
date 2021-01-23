/* 编译器 
*/

import { 
  isVary, 
} from "../vary/Vary.js";
import fd_elem from "./fdelem/fd_elem.js";
import fd_attrs from "./attrs/fd_attrs.js";
import fd_child from "./child/fd_child.js";


/* 处理 jsx 
  执行顺序 & 深度优先 
  tag       tagNameStr|componentFn|vary 
  attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
  children  [ str|elem|arr|vary ] 
*/
// let refObj = {};
let _order_num = 0; 

// console.log('##### compiler ');
function compiler(tag, attrs, ...children){
  // console.log( '# compiler', [...arguments] );
  attrs = attrs ?? {};
  // if (tag._scope_id) {
  //   attrs.__scope = tag._scope_id;
  // }
  
  // console.log('# compiler', tag, attrs, children, _order_num );
  const { 
    elem, 
    isCpt, 
    context = {
      _mountedFns: [],
    }, 
  } = fd_elem(tag, attrs, children, null);
  // console.log('# compiler', elem, isCpt, tag.toString().slice(0,11), _order_num++ );
  
  // let {
  //   refKV, 
  // } = 
  fd_attrs(elem, attrs, isCpt, context );
  // Object.assign(refObj, refKV);
  
  // if (isCpt) { console.log( children ); }
  children.forEach(child=>{
    if (child===undefined || child===null) { return ; }
    
    // 处理字符串子节点：去掉空格&忽略空字符串 
    if (typeof child === 'string' ) { 
      child = child.trim(); 
      if (child.length===0) { return ; }
    }
    if (isCpt) { child = '' }
    fd_child(elem, child, null, isCpt);
  })
  
  
  context._mountedFns.forEach((mountedFn,idx)=>{
    mountedFn({
      root: elem, 
    });
  })
  return elem;
}
export default compiler;




