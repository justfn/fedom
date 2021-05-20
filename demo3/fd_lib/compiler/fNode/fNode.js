import config from "../../config/config.js";
import message from "../../config/message.js";
import varyTagName from "../../featrues/varyValue/tagVary.js";
import cpntRender from "../../featrues/Component/cpntRender.js";
import Context from "../../featrues/Component/Context.js";
import { updateActiveComponentFNodes, } from "../../router/router.js";
import { 
  isComponentValue, 
  isVaryValue, 
  isFunctionValue, 
  isStringValue, 
  isNullValue, 
} from "../../utils/judge.js";




/* ** 工具方法: 获取 tag 类型  
// Inputs: tagName  
// Output: nodeType str,节点类型 
*/
export function getRealTagTypes(tagName){
  if (isVaryValue(tagName)) { return getRealTagTypes(tagName.$get(false)); }
  if (isComponentValue(tagName)) { return config.tag_types.component; }
  if (isFunctionValue(tagName)) { return config.tag_types.function; }
  if (isStringValue(tagName) || isNullValue(tagName) ) { return config.tag_types.origin; }
  
  return 'unknow';
}  

/* ** FNode 
*/
export class FNode {
  constructor(options){ 
    let { 
      varyTag, 
      tagName, 
      realNode, 
      attrs = {}, 
      children = [], 
      context = {}, 
    } = options;
    this.varyTag = varyTag;
    this.tagName = tagName;
    this.nodeType = getRealTagTypes(tagName);
    this.realNode = realNode;
    this.attrs = { ...attrs, };
    this.children = [...children];
    this.props = { 
      ...attrs, 
      children: this.children,
    };
    this.context = context;
  }
  
  // Vary,tag的壳 
  varyTag = null;
  tagName = '-';
  // KW,fNode节点类型  
  nodeType = '-';
  // Node,fNode对应的真实节点 
  realNode = null;
  // obj,不包含 .children 
  attrs = {};
  // obj,包含 .children 
  props = {};
  // arr,子节点集合
  children = [];
  // 函数组件的第二个参数/类组件实例 
  context = {};
}


/* ** 创建 FNode 
*/
let scope_id = 0;
export default function createFNode({ varyTag, tagName, attrs, children, scope, }){
  if (isVaryValue(tagName)) { 
    if (varyTag) { throw message.errors.mutil_vary; }
    
    return createFNode({
      varyTag: tagName, 
      tagName: tagName.$get(false),
      attrs, 
      children,
    }); 
  }
  
  let props = {
    ...attrs,
    children: [...children],
  }
  let fNode = null;
  /* output 1: class */
  if (isComponentValue(tagName)) {
    // 注意：此处又将调用 compiler 
    let {
      context,
      renderNode,
    } = cpntRender(tagName, props);
    fNode = new FNode({
      varyTag,
      tagName, 
      realNode: renderNode,
      attrs, 
      children, 
      context: context, 
    });
    updateActiveComponentFNodes(fNode);
  }
  /* output 2: function */
  else if ( isFunctionValue(tagName) ) {
    // 注意：此处又将调用 compiler 
    let context = new Context(props);
    let realNode = null;
    try { realNode = tagName(props, context); } 
    catch (err) {
      console.error(err) 
      throw err;
    } 
    context.root._resolve(realNode);
    // if (context.scopeId!==undefined) {
    //   scope.id = context.scopeId;
    // }
    // else {
    //   scope_id++;
    //   scope.id = 'scope_id-'+scope_id;
    // }
    
    fNode = new FNode({
      varyTag,
      tagName, 
      realNode,
      attrs, 
      children, 
      context, 
    })
    updateActiveComponentFNodes(fNode);
  }
  /* output 3: tag_str  */
  else if ( isStringValue(tagName) ) {
    let realNode = document.createElement(tagName);
    fNode = new FNode({
      varyTag,
      tagName, 
      realNode,
      attrs, 
      children, 
    });
  }
  else if ( isNullValue(tagName) ) {
    fNode = new FNode({
      varyTag,
      tagName, 
      realNode: document.createComment("fedom empty: null tagName"),
      attrs, 
      children, 
    });
    // console.log( fNode );
  }
  /* output 4: other todo */
  else {
    console.warn('# todo tag', tagName, attrs, varyTag);
  }
  
  
  // console.log( 'createFNode', varyTag, tagName, attrs, children );
  /* ** Features: 标签名动态化
  注意 变量名需大写否则jsx不处理  
  */
  varyTagName(fNode);
  
  return fNode;
}


