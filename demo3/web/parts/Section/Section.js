
import "./Section.less";


export default function Section(props, context){
  let isShow = $VaryValue(true,(bol)=>{
    if (bol) { return ''; }
    return 'none';
  })
  let isRotate = $VaryValue(isShow, (vv)=>{
    let v = vv.value;
    if (v) { return ''; }
    
    return 'rolate';
  });
  let showFn = ()=>{
    isShow.value=!isShow.value
  }
  
  return (
    <section class={['part_Section', props.class??'']}>
      <h1 class="ps_header" onClick={showFn}>
        <div class="ps_lft"> {props.title} </div>
        <div class={["ps_rit", isRotate]}> ▼ </div>
      </h1>
      <div class={['ps_wrap', isShow]}>
        { props.children }
      </div>
    </section>
  );
}


