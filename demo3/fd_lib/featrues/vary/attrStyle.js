
export function vary_sty_str(elem, varyWrap){
  let str = varyWrap.get(false);
  console.log('# todo');
} 
export function vary_sty_obj(elem, varyWrap){
  let obj = varyWrap.get(false);
  
  console.log('# todo');
} 
export function vary_sty_obj_val(elem, styKey, varyWrap ){
  let value = varyWrap.get(false);
  elem.style[styKey] = value;
  varyWrap.$mounted_run( value );
  varyWrap.$add_set((p_v,n_v)=>{
    elem.style[styKey] = n_v;
    return [n_v];
  })
  return value;
} 

