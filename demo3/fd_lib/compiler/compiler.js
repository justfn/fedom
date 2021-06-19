/* 编译器 
*/
import { 
  isFDComponent, 
  isStringValue, 
  isVaryValue, 
} from "../utils/judge.js";
import createFdNode from "./fdNode/fdNode.js";
import bindAttrs from "./attrs/bindAttrs.js";
import fillChildren from "./child/fillChild.js";
import varyTagName from "../featrues/VaryAction/varyTagName.js";
// import { compilerBefore, compilerAfter, } from "../featrues/Component/componentScope.js";

/* ** 处理 jsx 
执行顺序 & 深度优先 
tagName   tagNameStr|componentFn|vary 
attrs     null|{ key:str | key:obj | key:arr | key:vary  } 
children  [ str|elem|arr|vary ] 
*/
let compiled_num = 0; 
export default function compiler(tagName, attrs, ...children){
  attrs = attrs ?? {};
  compiled_num++;
  
  // 拆解 vary value 
  if ( isVaryValue(tagName) ) { return parseTag(tagName, tagName.get(false), attrs, children ) }
  
  return parseTag(null, tagName, attrs, children )
}
function parseTag(varyTag, tagName, attrs, children){
  const fdNode = createFdNode({
    varyTag, 
    tagName, 
    attrs, 
    children,
  });
  if ( isStringValue(tagName) ) { 
    bindAttrs(fdNode);
    fillChildren(fdNode);
  }
  if (varyTag) { varyTagName(fdNode); }
  
  return fdNode;
} 



