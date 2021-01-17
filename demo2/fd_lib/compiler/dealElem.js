

import { isVary, } from "../vary/Vary.js";
import compiler from "./index.js";

export function dealAttrs(attrs, el){
  for(let key in attrs){
    const val = attrs[key];
    if (key==='class') {
      if (typeof val === 'string') {
        el.setAttribute("class", val);
        continue;
      }
      if (isVary(val)) {
        console.log('todo');
        continue;
      }
      if (val instanceof Array) {
        let vl = val.reduce((retV,itm)=>{ 
          let it = itm; 
          if (isVary(itm)) { 
            it = itm.value;
            // 收集更新 
            itm.$add_update((p_v, n_v)=>{
              el.classList.remove(p_v)
              el.classList.add(n_v);
            }, el.classList)
          }
          return  retV + ' ' + it
        },'')
        vl = vl.slice(1)
        el.setAttribute("class", vl);
        continue;
      }
    }
    if (key==='style') {
      let vl = '';
      for(var ky in val){
        vl += ` ${ky}:${val[ky]};`
      };
      vl = vl.slice(1);
      // console.log(vl);
      el.setAttribute("style", vl);
      continue;
    }
    if (typeof val==='function') {
      el.addEventListener(key,(evt)=>{
        return val(evt);
      })
      continue;
    }
    
    el.setAttribute(key,val)
  };
} 



export function dealChildren(children, el){
  if (isVary(children)) {
    let _els = children.get();
    dealChildren(_els, el)
    // 收集更新 
    children.$add_update((p_v,n_v)=>{
      el.innerHTML = '';
      dealChildren(n_v, el)
    }, el.parentNode)
    return ;
  }
  children.forEach((itm,idx)=>{
    // console.log(itm, '# 03');
    if (itm===null || itm===undefined) { return ; }
    
    let it = itm; 
    if (isVary(itm)) {
      it = itm.value;
      if (typeof it === 'string' || typeof it === 'number' || it===null || it===undefined ) {
        it = it || '';
        let txtNode = document.createTextNode(it);
        el.appendChild(txtNode);
        itm.$add_update((p_v, n_v)=>{
          txtNode.textContent = n_v;
        }, txtNode)
        return ;
      }
      
      let _el = compiler(it);
      el.appendChild(_el);
      return ;
    }
    
    if (typeof it === 'string' || typeof it === 'number') {
      let txtNode = document.createTextNode(it);
      el.appendChild(txtNode);
      return ;
    }
    
    let _el = compiler(it);
    el.appendChild(_el);
  })
} 



