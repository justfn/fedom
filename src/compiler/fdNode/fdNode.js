import {
  warnLog, 
} from "../../utils/dev.js";
import { 
  isVaryValue, 
  isFDComponent, 
  isComponent, 
  isFunctionValue, 
  isStringValue, 
  isNull, 
} from "../../utils/judge.js";
import Component from "../../featrues/Component/Component.js";



/* ** FdNode 
*/
const msg_wran01 = 'todo tag';
const comment_node_tip01 = 'fedom empty: null tagName';
export class FdNode {
  constructor(options){ 
    let { 
      varyTag, 
      tagName, 
      attrs = {}, 
      children = [], 
    } = options;
    // Vary,tag的壳 
    this.varyTag = varyTag;
    // fn/class/str,标签 
    this.tagName = tagName;
    // obj,不包含 .children 
    this.attrs = attrs;
    // arr,子节点集合
    this.children = children;
    
    // Node,fdNode对应的真实节点 
    this.realNode = null; 
    // 函数组件的第二个参数/类组件实例 
    this.context = null;
    // 渲染真实节点 
    let props = { ...attrs }; 
    props.children = children ?? null; 
    this._renderNode(tagName, props);
  }
  
  _renderNode(tagName, props){
    /* output 1: class|function */
    if (isComponent(tagName)) { return this._renderNodeForClass(tagName, props); }
    if (isFunctionValue(tagName)) { return this._renderNodeForFunc(tagName, props); }
    /* output 2: tag_str  */
    if ( isStringValue(tagName) ) { return this._renderNodeForHtml(tagName); }
    /* output 3: null  */
    if ( isNull(tagName) ) { return this._renderNodeForComment(tagName); }
    
    /* output 4: other todo */
    warnLog(msg_wran01, tagName, props);
  }
  // 组件: class  
  _renderNodeForClass(TagName, props){
    this.context = new TagName(props);
    // 注意：此处又将调用 compiler 
    this.realNode = this.context.render().realNode;
    this.context.root.resolve(this.realNode);
  }
  // 组件: fn 
  _renderNodeForFunc(tagName, props){
    this.context = new Component(props);
    // 注意：此处又将调用 compiler 
    this.realNode = tagName(props, this.context).realNode;
    this.context.root.resolve(this.realNode);
  }
  // 标签: html 
  _renderNodeForHtml(tagName){
    this.realNode = document.createElement(tagName);
  }
  // 标签: null 
  _renderNodeForComment(tagName){
    this.realNode = document.createComment(comment_node_tip01);
  }
}


/* ** 创建 FdNode 
*/
export default function createFdNode(params){
  
  return new FdNode(params);
}


