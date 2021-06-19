/* 编译器 
*/
import createFdNode from "./fdNode/fdNode.js";
import addAttrs from "./attrs/addAttrs.js";
import fillChildren from "./child/fillChild.js";
import { compilerBefore, compilerAfter, } from "../featrues/Component/componentScope.js";
import { 
  isFDComponent, 
  isStringValue, 
  isVaryValue, 
} from "../utils/judge.js";
import varyTagName from "../featrues/VaryAction/varyTagName.js";

let compiled_num = 0; 
function parseTag(varyTag, tagName, attrs, children){
  const fdNode = createFdNode({
    varyTag, 
    tagName, 
    attrs, 
    children,
  });
  // if ( !isStringValue(tagName) ) { return null; }
  if (varyTag) { varyTagName(fdNode); }
  
  return fdNode;
} 
/* ** 处理 jsx 
执行顺序 & 深度优先 
tagName   tagNameStr|componentFn|vary 
attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
children  [ str|elem|arr|vary ] 
*/
export default function compiler(tagName, attrs, ...children){
  attrs = attrs ?? {};
  compiled_num++;
  
  // 拆解 vary value 
  if ( isVaryValue(tagName) ) { return parseTag(tagName, tagName.get(false), attrs, children ) }
  
  return parseTag(null, tagName, attrs, children )
}



