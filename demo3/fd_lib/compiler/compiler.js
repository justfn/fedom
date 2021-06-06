/* 编译器 
*/
import { globalWrite, globalRead, } from "../utils/globalWR.js";
import createFNode from "./fNode/fNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";
import { compilerBefore, compilerAfter, } from "../featrues/Component/componentScope.js";
import { 
  isFDComponent, 
  isStringValue, 
  isVaryValue, 
} from "../utils/judge.js";

let _order_num = 0; 

function parseTag(varyTag, tagName, attrs, children){
  const fNode = createFNode({
    varyTag, 
    tagName, 
    attrs, 
    children,
  });
  return fNode;
} 
/* ** 处理 jsx 
执行顺序 & 深度优先 
tagName   tagNameStr|componentFn|vary 
attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
children  [ str|elem|arr|vary ] 
*/
export default function compiler(tagName, attrs, ...children){
  attrs = attrs ?? {};
  _order_num++;
  
  // 拆解 vary value 
  if ( isVaryValue(tagName) ) { return parseTag(tagName, tagName.get(false), attrs, children ) }
  
  return parseTag(null, tagName, attrs, children )
}



