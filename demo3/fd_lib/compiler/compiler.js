/* 编译器 
*/

import createFNode from "./fNode/fNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";


/* 处理 jsx 
  执行顺序 & 深度优先 
  tagName   tagNameStr|componentFn|vary 
  attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
  children  [ str|elem|arr|vary ] 
*/
let _order_num = 0; 

// console.log('##### compiler ');
function compiler(tagName, attrs, ...children){
  // console.log( '# compiler', [...arguments] );
  attrs = attrs ?? {};
  
  // console.log('# compiler', tagName, attrs, children, _order_num );
  const fNode = createFNode({
    varyTag: null, 
    tagName, 
    attrs, 
    children,
  });
  // console.log('# compiler', realNode, tagName.toString().slice(0,11), _order_num++ );
  addAttrs( fNode );
  fillChildren( fNode );
  
  // // 组件初始化回调
  // fNode.context._mountedFns.forEach((mountedFn,idx)=>{
  //   mountedFn({
  //     root: realNode, 
  //   });
  // })
  return fNode.realNode;
}
export default compiler;




