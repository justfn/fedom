/* 编译器 
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import createFNode from "./fNode/fNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";
import { compilerBefore, compilerAfter, } from "../featrues/Component/componentScope.js";
import { 
  isFDComponent, 
} from "../utils/judge.js";

let _order_num = 0; 

/* ** 处理 jsx 
执行顺序 & 深度优先 
tagName   tagNameStr|componentFn|vary 
attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
children  [ str|elem|arr|vary ] 
*/

export default function compiler(tagName, attrs, ...children){
  // console.log('##### compiler 1', tagName, attrs, children, current_scope);
  
  // compilerBefore(tagName, attrs, children);
  
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
    // scopeObj: current_scope,
  });
  // log( 
  //   '# compiler_2', 
  //   // tagName, 
  //   // attrs, 
  //   // children 
  // );
  addAttrs( fNode );
  fillChildren( fNode );
  
  // 传递 实例/context 
  if (isFDComponent(tagName)) {
    try {
      fNode.realNode.context = fNode.context
    } 
    catch (err) { console.log('compiler todo ', err); } 
  }
  
  // compilerAfter(fNode);
  
  // console.log('##### compiler 2' );
  return fNode.realNode;
}




