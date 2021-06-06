import config from "../../config/config.js";
import varyTagName from "../../featrues/varyValue/tagVary.js";
import componentRender from "../../featrues/Component/componentRender.js";
import { updateActiveComponentFNodes, } from "../../router/router.js";
import { 
  isVaryValue, 
  isFDComponent, 
  isComponent, 
  isFunctionValue, 
  isStringValue, 
  isNull, 
} from "../../utils/judge.js";
import {
  warnLog, 
} from "../../utils/dev.js";
import addAttrs from "../attrs/addAttrs.js";
import fillChildren from "../child/fillChild.js";



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
const error_arguments = 'error arguments of createFNode';
const todo_tag = 'todo tag'
export default function createFNode(params){
  let { 
    varyTag, 
    tagName, 
    attrs, 
    children, 
  } = params;
  // console.log("000000000 createFNode", params)
  if (isVaryValue(tagName)) { 
    return createFNode({
      varyTag: tagName, 
      tagName: tagName.get(false),
      attrs, 
      children,
    }); 
  }
  
  
  /* output 1: class|function */
  if (isFDComponent(tagName)) {
    // 注意：此处又将调用 compiler 
    let fNode = componentRender( params );
    updateActiveComponentFNodes(fNode);
    if (varyTag) {
      
      // console.log("000000000 chld 3", children , fNode)
    }
    varyTagName(fNode);
    return fNode;
  }
  
  /* output 2: tag_str  */
  if ( isStringValue(tagName) ) {
    let realNode = document.createElement(tagName);
    let fNode = new FNode({
      varyTag,
      tagName, 
      realNode,
      attrs, 
      children, 
    });
    varyTagName(fNode);
    addAttrs( fNode );
    fillChildren( fNode );
    return fNode;
  }
  
  /* output 3: null  */
  if ( isNull(tagName) ) {
    let fNode = new FNode({
      varyTag,
      tagName, 
      realNode: document.createComment("fedom empty: null tagName"),
      attrs, 
      children, 
    });
    varyTagName(fNode);
    return fNode;
  }
  
  /* output 4: other todo */
  warnLog(todo_tag, tagName, attrs, varyTag);
  
  
  
  
}


