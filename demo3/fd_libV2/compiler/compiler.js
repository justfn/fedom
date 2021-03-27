/* 编译器 
*/

// import { isVary, } from "../vary/Vary.js";
import fd_elem from "./fdelem/fd_elem.js";
import fd_attrs from "./attrs/fd_attrs.js";
import fd_child from "./child/fd_child.js";
import FNode from "./FNode/FNode.js";

/* 处理 jsx 
  执行顺序 & 深度优先 
  tag       tagNameStr|componentFn|vary 
  attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
  children  [ str|elem|arr|vary ] 
*/
let _order_num = 0; 

// console.log('##### compiler ');
function compiler(tag, attrs, ...children){
  let fNode = new FNode(tag, attrs, children);
  return fNode.realNode;
}
export default compiler;




