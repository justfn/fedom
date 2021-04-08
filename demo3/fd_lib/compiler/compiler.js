/* 编译器 
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import createFNode from "./fNode/fNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";
// import onMounted from "../featrues/lifecycle/onMounted.js";
import onPageLoaded from "../featrues/lifecycle/onPageLoaded.js";


let _order_num = 0; 

/* ** 处理 jsx 
执行顺序 & 深度优先 
tagName   tagNameStr|componentFn|vary 
attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
children  [ str|elem|arr|vary ] 
*/
export default function compiler(tagName, attrs, ...children){
  // console.log('##### compiler ');
  attrs = attrs ?? {};
  _order_num++;
  
  // log( 
  //   '# compiler_1', 
  //   // tagName, 
  //   // attrs, 
  //   // children 
  // );
  const fNode = createFNode({
    varyTag: null, 
    tagName, 
    attrs, 
    children,
  });
  // log( 
  //   '# compiler_2', 
  //   // tagName, 
  //   // attrs, 
  //   // children 
  // );
  addAttrs( fNode );
  fillChildren( fNode );
  
  
  // onMounted( fNode );
  onPageLoaded( fNode, _order_num, ()=>{
    _order_num = 0;
  });
  
  return fNode.realNode;
}




