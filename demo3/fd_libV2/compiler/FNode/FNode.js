
/* fedom 节点
*/
import message from "../../message.js";

import { isVary, } from "../../featrues/vary/Vary.js";
import { isComponent, } from "../../featrues/component/Component.js";
import { $push, $replace, $getRoutes } from "../../router/router.js";


import { 
  vary_str_el, 
  vary_cpt, 
} from "../fdelem/vary_value.js";

import { 
  deal_class, 
  deal_style, 
  deal_event, 
  deal_ref_callback, 
} from "../attrs/attr.js";
import { 
  is_form_elems, 
  deal_form_elems, 
} from "../attrs/form.js";

import { 
  deal_node, 
  deal_text, 
} from "../child/deal.js";
import { 
  vary_arr, 
  vary_str,
  vary_nod,
} from "../child/vary_value.js";

class FNode {
  constructor(tagName, attrs, children, varyTag){
    this.fnodeType = this.getTagType(tagName);
    this.children = [...children];
    let props = attrs || {}; 
    this.props = { 
      ...props, 
      children: this.children,
    }
    let { 
      realNode, 
    } = this._dealElem({
      tagName, 
      props: this.props, 
      children: this.children,
      varyTag: varyTag, 
    });
    this._dealAttrs(realNode, props);
    this._dealChildren(realNode, this.children);
    
    
    /* ** feature_todo: 生命周期 渲染后的回调 
    // this.fnContext._mountedFns.forEach((mountedFn,idx)=>{
    //   mountedFn({
    //     root: elem, 
    //   });
    // })
    */
  }
  // 节点类型: tag | fn | cls | vary
  fnodeType = ''; 
  realType = ''; // tag | fn | cls 
  // 子节点集合 
  children = [];
  // 节点属性集合 
  props = {};
  // 函数组件的 context 
  fnContext = {
    _mountedFns: [],
    // 搜集初始化执行操作 
    mounted(fn){
      this._mountedFns.push(fn)
    },
    // 提供插入富文本的能力 
    html(htmlStr){
      let div = document.createElement("div")
      div.innerHTML = htmlStr;
      return [...div.childNodes];
    },
    // 路由跳转能力
    $push,
    $replace,
    $routes: $getRoutes(true),
  };
  // 真实节点 
  realNode = '';
  
  /* --------------------------------------------------------------- tools */
  // 检查节点类型 
  getTagType(tagName){
    if (isVary(tagName)) { 
      let realTag = tagName.get(false);
      let realType = this.getTagType(realTag);
      if (realType==='vary') { throw message.errors.mutil_vary; }
      
      this.realType = realType;
      return 'vary'; 
    }
    if (isComponent(tagName)) { return 'cls'; }
    if (typeof tagName === 'function') { return 'fn'; }
    if (typeof tagName === 'string') { return 'tag'; }
    
    return 'unknow';
  }
  
  /* --------------------------------------------------------------- 处理元素 */
  _dealElem({ tagName, props, children, varyTag }){
    if (isVary(tagName)&&varyTag) { 
      throw message.errors.mutil_vary;
      return ;
    }
    
    /* ** feature_todo: vary tagName 
    */
    if (isVary(tagName)) { 
      varyTag = tagName;
      tagName = varyTag.get(false);
      let fNode = new FNode(tagName, props, children, varyTag);
      return {
        realNode: fNode.realNode,
      }
      // this._dealElem({
      //   tagName, 
      //   props, 
      //   children, 
      //   varyTag, 
      // }); 
    }
    
    /* branch 1: class */
    if (isComponent(tagName)) {
      // 注意：此处又将调用 compiler 
      let ctx = new tagName(props);
      let realNode = ctx.render(props);
      // this.realNode = realNode;
      
      /* ** feature_todo: vary tagName cls cpt 
      */
      
      return {
        realNode, 
      };
    }
    
    /* branch 2: function */
    if (typeof tagName === 'function') {
      // 注意：此处又将调用 compiler 
      let realNode = tagName(props, this.fnContext);
      // this.realNode = realNode;
      
      /* ** feature_todo: vary tagName fn cpt 
      */
      // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
      if (varyTag) { 
        console.log('000', realNode );
        vary_cpt(realNode, props, varyTag); 
      }
      
      return {
        realNode,
      };
    }
    
    /* branch 3: tagName 最终的出口 */
    if (typeof tagName === 'string') {
      let realNode = document.createElement(tagName);
      // this.realNode = realNode;
      
      /* ** feature_todo: vary tagName string 
      */
      // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
      if (varyTag) { vary_str_el(realNode, props, varyTag); }
      
      return {
        realNode,
      };
    }

    
    /* branch 9: other todo */
    console.warn('# todo tag', tagName, props, varyTag);
  }
  /* --------------------------------------------------------------- 处理属性 */
  _dealAttrs(elem, attrs){
    // /* brance: __scopeId todo */
    // if (key==='__scope') {
    //   elem.setAttribute(`data-fd_scope_id`, `fd_${val}`);
    //   continue; 
    // }
    
    /* ** feature_attr: ref_fn 
    // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
    */
    if (this.fnodeType!=='tag') { return this._dealCptAttrs(attrs); }
    
    for(let key in attrs){
      const val = attrs[key];
      
      if (val===undefined || val===null) { val = ''; }
      
      /* brance: class */
      if (key==='class') {
        deal_class(elem, val);
        continue;
      }
      /* brance: style */
      if (key==='style') {
        deal_style(elem, val);
        continue;
      }
      /* brance: event */
      if (/^on(\w+)$/.test(key)) {
        deal_event(elem, RegExp.$1.toLowerCase(), val);
        continue;
      }
      /* brance: ref_callback */
      if (key==='ref' ) {
        deal_ref_callback(elem, val);
        continue; 
      }
      /* brance: form_elems */
      if (is_form_elems(elem)) {
        deal_form_elems(elem, key, val);
        continue; 
      }
      /* brance: other_key */
      try {
        elem.setAttribute(key, val);
      } 
      catch (e) {
        console.warn('# todo attrs other', elem, key, val);
      } 
      
    };
  }
  _dealCptAttrs(attrs){
    if (attrs.ref && typeof attrs.ref==='function') { attrs.ref(this); }
  }
  /* --------------------------------------------------------------- 处理子元素 */
  _dealChildren(realNode, children){
    children.forEach(child=>{
      if (child===undefined || child===null) { return ; }
      
      /* ** feature_str: 去除空格 
      // 处理字符串子节点：去掉空格&忽略空字符串 
      */
      if (typeof child === 'string' ) { 
        child = child.trim(); 
        if (child.length===0) { return ; }
      }
      if (this.fnodeType!=='tag') { child = '' }
      this._dealChild(realNode, child, null, this.fnodeType!=='tag');
    })
  }
  _dealChild( elem, child, varyWrap, isCpt ){
    
    /* brance: vary */
    if (isVary(child)) { return this._dealChild(elem, child.get(false), child, isCpt); }
    
    /* brance: arr */
    if (child instanceof Array) { 
      child.forEach((cldItm,idx)=>{
        this._dealChild(elem, cldItm, null, isCpt);
      })
      if (varyWrap) { vary_arr(elem, child, varyWrap, isCpt, this._dealChild); }
      return ;
    }
    
    /* Result: undefind null */
    if (child === undefined || child === null) {
      let txtNode = deal_text(elem, '');
      if (varyWrap) { vary_str(txtNode, '', varyWrap) }
      return;
    }
    /* Result: text */
    if (typeof child === 'string' || typeof child === 'number' ) {
      child += '';
      let txtNode = deal_text(elem, child);
      if (varyWrap) { vary_str(txtNode, child, varyWrap) }
      return ;
    }
    /* Result: node */
    if (child instanceof Node) { 
      deal_node(elem, child, varyWrap);
      if (varyWrap) { vary_nod( elem, varyWrap ); }
      return ;
    }
    /* Result: other */
    console.warn('# todo child', elem, child);
    this._dealChild(elem, child.toString(), null, isCpt);
  }
  
}
export default FNode;

