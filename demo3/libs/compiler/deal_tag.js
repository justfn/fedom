// import compiler from "./compiler.js";
import { isVary, } from "../vary/Vary.js";


export default function main(tag, attrs, varyWrap){
  /* Vary */
  if (isVary(tag)) {
    // tag.$mounted_run();
    return main(tag.value, attrs, tag);
  }
  
  /* brance: tagName */
  if (typeof tag === 'string') {
    let elem = document.createElement(tag);
    // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      varyWrap.$add_update((p_v, n_v)=>{
        // Feature_more: 设值为false的值，则直接删除该节点 
        if (!n_v) { 
          elem.parentNode.removeChild(elem);
          return ;
        }
        
        // elem.tagName = n_v; 
        console.log('# todo optimize tag', tag, attrs, varyWrap);
        let pNode = elem.parentNode;
        let elemNew = document.createElement(n_v);
        // todo 属性转移 
        elemNew.innerHTML = elem.innerHTML;
        pNode.replaceChild(elemNew, elem);
        return n_v;
      })
    }
    
    return {
      elem: elem,
      isCpt: false, 
      mountedFns: [], 
    }
  }
  /* brance: component */
  if (typeof tag === 'function') {
    let mountedFns = [];
    // 注意：此处又将调用 compiler 
    let elem = tag(attrs, {
      mounted: (fn)=>{
        mountedFns.push(fn)
      },
    })
    if (!tag._scopeId) {
      tag._scopeId = window._scope_id;
      window._scope_id++;
    }
    // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      varyWrap.$add_update((p_v, n_v)=>{
        let pNode = elem.parentNode; 
        pNode.replaceChild(n_v(attrs, {
          mounted: (fn)=>{
            
          },
        }), elem)
        // 替换掉组件 
        return n_v;
      })
    }
    
    return {
      elem: elem,
      isCpt: true, 
      mountedFns: mountedFns, 
    };
  }
  
  console.warn('# todo tag', tag, attrs, varyWrap);
}

