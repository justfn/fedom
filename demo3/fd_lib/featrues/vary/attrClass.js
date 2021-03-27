

export function vary_cls_str(elem, varyWrap){
  let vl = varyWrap.get(false);
  varyWrap.$mounted_run(elem.className);
  varyWrap.$add_set((p_v, n_v)=>{
    elem.className = n_v;
    return [n_v];
  }, elem.className);
} 
export function vary_cls_arr(elem, arr){
  console.log('todo ');
} 
export function vary_cls_arr_itm(elem, itm){
  let it = itm.get(false);
  itm.$mounted_run(elem.classList);
  itm.$add_set((p_v, n_v)=>{
    if (p_v!=='') { elem.classList.remove(p_v); }
    if (n_v!=='') { elem.classList.add(n_v); }
    return [n_v];
  }, elem.classList)
  return it;
} 


