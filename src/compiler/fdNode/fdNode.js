import { 
  isVaryValue, 
  isClassValue, 
  isFunctionValue, 
  isStringValue, 
  isEmptyValue, 
} from "../../utils/judge.js";
import renderCpnt from "../../featrues/Component/renderCpnt.js";
import * as cpntScope from "../../featrues/Component/scopeCpnt.js";

/* ** FdNode 
*/
const comment_node_text = 'fedom empty: null tagName';
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
    cpntScope.scopeMark(attrs);
    /* output 1: component */
    if ( isClassValue(tagName) ) {
      cpntScope.preParse(tagName);
      const {
        context, 
        realNode, 
      } = renderCpnt(tagName, props); 
      cpntScope.nxtParse();
      this.context = context;
      this.realNode = realNode;
      return ;
    }
    /* output 2: tag_str  */
    if ( isStringValue(tagName) ) { 
      this.realNode = document.createElement(tagName);
      return ;
    }
    /* output 3: null/undefined  */
    if ( isEmptyValue(tagName) ) { 
      this.realNode = document.createComment(comment_node_text);
      return ; 
    }
    
    /* output 4: other todo */
    console.error('解析jsx失败', tagName, props)
  }
}


/* ** 创建 FdNode 
*/
export default function createFdNode(params){
  
  return new FdNode(params);
}


