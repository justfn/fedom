// import compiler from "./compiler.js";
import { isVary, } from "../vary/Vary.js";
import deal_attrs from "./deal_attrs.js";

// // 组件编译scope标识 todo 
// let _scope = {
//   id: 1, 
//   preId: null, // 前一个处理的id 
//   // <id>: fn, 
// }
// window._scope = _scope; // test 

export default function main(tag, attrs, varyWrap){
  /* Vary */
  if (isVary(tag)) {
    // tag.$mounted_run();
    return main(tag.value, attrs, tag);
  }
  
  /* brance: tagName 最终的出口 */
  if (typeof tag === 'string') {
    let elem = document.createElement(tag);
    // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      let pNode = elem.parentNode;
      let pre_node = elem; 
      let nxt_node = null;
      varyWrap.$add_set((p_v, n_v, atrs)=>{
        // Feature_more: 设值为false的值，则直接删除该节点 
        if (!n_v) { 
          pre_node.parentNode.removeChild(pre_node);
          return [];
        }
        
        pNode = pNode ?? pre_node.parentNode;
        console.log( pNode );
        nxt_node = document.createElement(n_v);
        deal_attrs(nxt_node, atrs, false)
        Array.prototype.forEach.call( [...pre_node.childNodes], (itm)=>{
          nxt_node.appendChild(itm);
        })
        pNode.replaceChild(nxt_node, pre_node);
        pre_node = nxt_node;
        return [n_v, pNode];
      }, attrs)
    }
    
    // if (_scope.preId) { 
    //   let _pre_id = elem.getAttribute(`data-fd_scope_id`);
    //   _pre_id = _pre_id * 1; 
    // }
    // else {
    //   _scope.preId = _scope.id;
    //   // elem.setAttribute(`data-fd_scope_id`, `fd_${_scope.id}`);
    // }
    // console.log( elem , _scope.id  );
    let _attrs = {
      ...attrs,
    }
    return {
      elem: elem,
      isCpt: false, 
      mountedFns: [], 
      _attrs,
    }
  }
  /* brance: component */
  if (typeof tag === 'function') {
    // if (!_scope[tag._scope_id]) {
    //   tag._scope_id = _scope.id;
    //   _scope[tag._scope_id] = tag; 
    //   attrs.__scope = _scope.id;
    //   ++_scope.id;
    // }
    
    
    let mountedFns = [];
    let _attrs = {...attrs, }; 
    // 注意：此处又将调用 compiler 
    let elem = tag( _attrs, {
      mounted: (fn)=>{
        mountedFns.push(fn)
      },
    })
    // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      let pNode = elem.parentNode;
      let pre_node = elem;
      let nxt_node = null;
      varyWrap.$add_set((p_v, n_v)=>{
        pNode = pNode ?? pre_node.parentNode;
        nxt_node = n_v(attrs, {
          mounted: (fn)=>{
          },
        })
        pNode.replaceChild(nxt_node, pre_node);
        pre_node = nxt_node;
        // 替换掉组件 
        return [n_v, pNode];
      })
    }
    
    return {
      elem: elem,
      isCpt: true, 
      mountedFns: mountedFns, 
      _attrs: _attrs,
    };
  }
  
  console.warn('# todo tag', tag, attrs, varyWrap);
}

