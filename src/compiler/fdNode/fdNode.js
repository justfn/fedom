import { 
  isVaryValue, 
  isFDComponent, 
  isComponent, 
  isFunctionValue, 
  isStringValue, 
  isNull, 
} from "../../utils/judge.js";
import componentRender from "../../featrues/Component/componentRender.js";
import * as componentScope from "../../featrues/Component/componentScope.js";


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
    this._renderNode(tagName, props, attrs);
  }
  
  _renderNode(tagName, props, attrs){
    componentScope.scopeMark(attrs);
    /* output 1: component */
    if ( isFDComponent(tagName) ) {
      componentScope.preParse(tagName);
      const {
        context, 
        realNode, 
      } = componentRender(tagName, props); 
      componentScope.nxtParse();
      this.context = context;
      this.realNode = realNode;
      return ;
    }
    /* output 2: tag_str  */
    if ( isStringValue(tagName) ) { 
      this.realNode = document.createElement(tagName);
      return ;
    }
    /* output 3: null  */
    if ( isNull(tagName) ) { 
      this._renderNodeForComment(tagName); 
      this.realNode = document.createComment(comment_node_tip01);
      return ; 
    }
    
    /* output 4: other todo */
    console.warn('todo:', msg_wran01, tagName, props)
  }
}


/* ** 创建 FdNode 
*/
export default function createFdNode(params){
  
  return new FdNode(params);
}


