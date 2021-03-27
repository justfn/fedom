
/* fedom 节点
*/


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
  constructor(tagName, attrs, children){
    attrs = attrs || {}; 
    this.attrs = { 
      ...attrs, 
      children: [...children],
    }
    console.log( 1 );
    this._dealElem(tagName, children);
    console.log( 2);
    this._dealAttrs(attrs);
    this._dealChildren(children);
    
    /* ** feature_todo: 生命周期 渲染后的回调 
    // this.fnContext._mountedFns.forEach((mountedFn,idx)=>{
    //   mountedFn({
    //     root: elem, 
    //   });
    // })
    */
  }
  // 节点类型: tag | fn | cls 
  fnodeType = ''; 
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
  // 节点属性集合 
  attrs = {};
  // 真实节点 
  realNode = '';
  
  
  /* --------------------------------------------------------------- 处理元素 */
  _dealElem(tagName, children){
    let tagVary = null; 
    /* ** feature_todo: vary tagName 
    */
    console.log(1,isVary(tagName), tagName, this.attrs);
    if (isVary(tagName)) { 
      console.log(2, isVary(tagName), tagName, this.attrs);
      tagVary = tagName;
      let tagName = tagVary.get(false);
      return this._dealElem( tagName, children); 
    }
    
    /* branch 1: tagName 最终的出口 */
    if (typeof tagName === 'string') {
      console.log( this.fnodeType, '111' );
      this.fnodeType = 'tag'
      this.realNode = document.createElement(tagName);
      /* ** feature_todo: vary tagName string 
      */
      // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
      if (tagVary) { vary_str_el(this.realNode, attrs, tagVary); }
      return ;
    }
    
    /* branch 2: function */
    if (isComponent(tagName)) {
      this.fnodeType = 'cls'
      // 注意：此处又将调用 compiler 
      let ctx = new tagName(this.attrs);
      this.realNode = ctx.render(this.attrs);
      
      /* ** feature_todo: vary tagName cls cpt 
      */
      
      return ;
    }
    
    /* branch 3: function */
    if (typeof tagName === 'function') {
      console.log( this.fnodeType, '222' );
      this.fnodeType = 'fn'
      // 注意：此处又将调用 compiler 
      this.realNode = tagName(this.attrs, this.fnContext);
      
      /* ** feature_todo: vary tagName fn cpt 
      */
      // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
      if (tagVary) { vary_cpt(this.realNode, this.attrs, tagVary); }
      
      return ;
    }
    
    /* branch 9: other todo */
    console.warn('# todo tag', tagName, this.attrs, tagVary);
  }
  /* --------------------------------------------------------------- 处理属性 */
  _dealAttrs(attrs){
    let elem = this.realNode;
    // /* brance: __scopeId todo */
    // if (key==='__scope') {
    //   elem.setAttribute(`data-fd_scope_id`, `fd_${val}`);
    //   continue; 
    // }
    
    /* ** feature_attr: ref_fn 
    // 组件需将属性作为props传递，只处理 ref，不绑定到元素上 
    */
    if (this.fnodeType!=='tag') { return this._dealCptAttrs(); }
    
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
  _dealCptAttrs(){
    if (this.attrs.ref && typeof this.attrs.ref==='function') { attrs.ref(this); }
  }
  /* --------------------------------------------------------------- 处理子元素 */
  _dealChildren(children){
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
      this._dealChild(this.realNode, child, null, this.fnodeType!=='tag');
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

