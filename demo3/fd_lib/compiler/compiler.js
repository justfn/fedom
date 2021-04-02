/* 编译器 
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import createFNode from "./fNode/fNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";
import onMounted from "../featrues/onMounted.js";
import onUnmount from "../featrues/onUnmount.js";


/* 处理 jsx 
  执行顺序 & 深度优先 
  tagName   tagNameStr|componentFn|vary 
  attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
  children  [ str|elem|arr|vary ] 
*/
let _order_num = 0; 

// console.log('##### compiler ');
function compiler(tagName, attrs, ...children){
  attrs = attrs ?? {};
  _order_num++;
  // log( '# compiler_1', _order_num );
  
  const fNode = createFNode({
    varyTag: null, 
    tagName, 
    attrs, 
    children,
  });
  // log( '# compiler_2', fNode );
  addAttrs( fNode );
  fillChildren( fNode );
  
  
  onMounted( fNode );
  onUnmount( fNode );
  
  /* todo: page_loaded 功能 */
  setTimeout(()=>{
    if (fNode.realNode.parentElement!==globalRead('elems.root') || globalRead('status.isLoaded')) { return ; }
    globalWrite('status.isLoaded', true);
    
    log('##################### page loaded');
    log(_order_num);
  })
  
  return fNode.realNode;
}
export default compiler;




