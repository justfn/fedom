
import message from "../../message.js";
import { isVary, } from "../../featrues/vary/Vary.js";
import { isComponent, } from "../../featrues/Component.js";
import { $push, $replace, $getRoutes, } from "../../router/router.js";

import tagClass from "../../featrues/vary/tagClass.js";
import tagFunction from "../../featrues/vary/tagFunction.js";
import tagString from "../../featrues/vary/tagString.js";



/* ** 工具方法: 获取 tag 类型  
// Inputs: tagName  
// Output: nodeType str,节点类型: tag | fn | cls 
*/
export function getRealTagTypes(tagName){
  if (isVary(tagName)) { return getRealTagTypes(tagName.get(false)); }
  if (isComponent(tagName)) { return 'cls'; }
  if (typeof tagName === 'function') { return 'fn'; }
  if (typeof tagName === 'string') { return 'tag'; }
  
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
      instance = {}, 
    } = options;
    this.varyTag = varyTag;
    this.nodeType = getRealTagTypes(tagName);
    this.realNode = realNode;
    this.attrs = { ...attrs, };
    this.children = [...children];
    this.props = { 
      ...attrs, 
      children: this.children,
    };
    this.context = context;
    this.instance = instance;
  }
  
  varyTag = null;
  nodeType = '-';
  realNode = null;
  attrs = {};
  props = {};
  children = [];
  // 函数组件的第二个参数 
  context = {};
  // 类组件实例 
  instance = {}; 
}


/* ** 创建 FNode 
*/
export default function createFNode({ varyTag, tagName, attrs, children }){
  let props = {
    ...attrs,
    children: [...children],
  }
  if (isVary(tagName)) { 
    if (varyTag) { throw message.errors.mutil_vary; }
    
    return createFNode({
      varyTag: tagName, 
      tagName: tagName.get(false),
      attrs, 
      children,
    }); 
  }
  
  /* output 1: class */
  if (isComponent(tagName)) {
    // 注意：此处又将调用 compiler 
    let instance = new tagName(props);
    let realNode = instance.render(props);
    let fNode = new FNode({
      varyTag,
      tagName, 
      realNode,
      attrs, 
      children, 
      instance, 
    });
    
    /* ** Features: to_do 
    组件动态化  
    */
    tagClass(fNode);
    
    return fNode;
  }
  /* output 2: function */
  if (typeof tagName === 'function') {
    // 注意：此处又将调用 compiler 
    let context = {
      _mountedFns: [],
      // 搜集初始化执行操作 
      onMounted(fn){
        this._mountedFns.push(fn);
      },
      // 提供插入富文本的能力 
      html(htmlStr){
        let div = document.createElement("div");
        div.innerHTML = htmlStr;
        return [...div.childNodes];
      },
      // 路由跳转能力
      $push,
      $replace,
      $routes: $getRoutes(true),
    }
    let realNode = tagName(props, context);
    
    let fNode = new FNode({
      varyTag,
      tagName, 
      realNode,
      attrs, 
      children, 
      context, 
    })
    /* ** Features: 组件动态化 
    注意 变量名需大写否则jsx不处理  
    */
    tagFunction(fNode);
    
    return fNode;
  }
  /* output 3: tag_str  */
  if (typeof tagName === 'string') {
    let realNode = document.createElement(tagName);
    let fNode = new FNode({
      varyTag,
      tagName, 
      realNode,
      attrs, 
      children, 
    });
    
    /* ** Features: 标签名动态化
    注意 变量名需大写否则jsx不处理  
    */
    tagString(fNode);
    
    return fNode;
  }
  
  /* output 4: other todo */
  console.warn('# todo tag', tagName, attrs, varyTag);
}


