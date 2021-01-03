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
      varyWrap.$add_update((p_v, n_v, atrs)=>{
        // Feature_more: 设值为false的值，则直接删除该节点 
        if (!n_v) { 
          elem.parentNode.removeChild(elem);
          return [];
        }
        
        // elem.tagName = n_v; 
        // console.log('# todo optimize tag', tag, attrs, varyWrap);
        let pNode = elem.parentNode;
        let elemNew = document.createElement(n_v);
        deal_attrs(elemNew, atrs, false)
        // todo 属性转移 
        elemNew.innerHTML = elem.innerHTML;
        pNode.replaceChild(elemNew, elem);
        return [n_v];
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
      varyWrap.$add_update((p_v, n_v, pNd)=>{
        pNode = pNode ?? elem.parentNode;
        pNd = pNd ?? pNode; 
        nxt_node = n_v(attrs, {
          mounted: (fn)=>{
          },
        })
        pNd.replaceChild(nxt_node, pre_node);
        pre_node = nxt_node;
        // 替换掉组件 
        return [n_v, pNd];
      }, pNode)
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

