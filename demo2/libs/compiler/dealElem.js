

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
            itm._fns.push((fn)=>{
              let _pre_v = itm.get();
              let _v = fn(_pre_v);
              el.classList.remove(_pre_v)
              el.classList.add(_v);
              return _v;
            });
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
    children._fns.push((fn)=>{
      let _v = fn(children.get());
      // console.log('# 05', el);
      el.innerHTML = '';
      dealChildren(_v, el)
      return _v;
    });
    dealChildren(_els, el)
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
        itm._fns.push((fn)=>{
          let _v = fn(itm.get());
          txtNode.textContent = _v;
          return _v;
        })
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



