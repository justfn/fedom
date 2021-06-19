import varyTagName from "../../featrues/varyValue/tagVary.js";
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
import Component from "../../featrues/Component/Component.js";



/* ** FNode 
*/
const msg_wran01 = 'todo tag'
export class FNode {
  constructor(options){ 
    let { 
      varyTag, 
      tagName, 
      attrs = {}, 
      children = [], 
      // realNode, 
      // context = {}, 
    } = options;
    // Vary,tag的壳 
    this.varyTag = varyTag;
    // 标签 
    this.tagName = tagName;
    // obj,不包含 .children 
    this.attrs = { ...attrs, };
    // arr,子节点集合
    this.children = [...children];
    // obj,包含 .children 
    this.props = { 
      ...attrs, 
      children: this.children,
    };
    
    // Node,fNode对应的真实节点 
    this.realNode = null; 
    // 函数组件的第二个参数/类组件实例 
    this.context = null;
    this._init(tagName, this.props);
  }
  
  _init(tagName, props){
    /* output 1: class|function */
    // 类组件 
    if (isComponent(tagName)) {
      this.context = new tagName(props);
      // 注意：此处又将调用 compiler 
      this.realNode = this.context.render().realNode;
      this.context.root.resolve(this.realNode);
      updateActiveComponentFNodes(this);
      varyTagName(this);
      return ;
    }
    
    // 函数组件 
    if (isFunctionValue(tagName)) {
      this.context = new Component(props);
      // 注意：此处又将调用 compiler 
      this.realNode = tagName(props, this.context).realNode;
      this.context.root.resolve(this.realNode);
      updateActiveComponentFNodes(this);
      varyTagName(this);
      return ;
    }
    
    
    /* output 2: tag_str  */
    if ( isStringValue(tagName) ) {
      this.realNode = document.createElement(tagName);
      fillChildren( this );
      addAttrs( this );
      varyTagName(this);
      return ;
    }
    
    /* output 3: null  */
    if ( isNull(tagName) ) {
      this.realNode = document.createComment("fedom empty: null tagName");
      varyTagName(this);
      return ;
    }
    
    
    /* output 4: other todo */
    warnLog(msg_wran01, tagName, attrs, varyTag);
  }
}


/* ** 创建 FNode 
*/
export default function createFNode(params){
  
  return new FNode(params);
}


