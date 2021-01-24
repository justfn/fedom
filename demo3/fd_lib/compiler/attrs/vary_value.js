

function vary_cls_str(elem, varyWrap){
  let vl = varyWrap.get(false);
  varyWrap.$mounted_run(elem.className);
  // 收集更新 
  varyWrap.$add_set((p_v, n_v)=>{
    elem.className = n_v;
    return [n_v];
  }, elem.className);
} 
function vary_cls_arr(elem, arr){
  console.log('todo ');
} 
function vary_cls_arr_itm(elem, itm){
  let it = itm.get(false);
  itm.$mounted_run(elem.classList);
  // 收集更新 
  itm.$add_set((p_v, n_v)=>{
    if (p_v!=='') { elem.classList.remove(p_v); }
    if (n_v!=='') { elem.classList.add(n_v); }
    return [n_v];
  }, elem.classList)
  return it;
} 
function vary_sty_str(elem, varyWrap){
  let vl = varyWrap.get(false);
  elem.setAttribute("style",vl)
} 
function vary_sty_obj(){
  console.log('# todo');
} 
function vary_sty_obj_val(elem, styKey, varyWrap ){
  let value = varyWrap.get(false);
  elem.style[styKey] = value;
  varyWrap.$mounted_run( value );
  varyWrap.$add_set((p_v,n_v)=>{
    elem.style[styKey] = n_v;
    return [n_v];
  })
  return value;
} 


export {
  vary_cls_str,
  vary_cls_arr,
  vary_cls_arr_itm,
  vary_sty_str,
  vary_sty_obj,
  vary_sty_obj_val,
}

