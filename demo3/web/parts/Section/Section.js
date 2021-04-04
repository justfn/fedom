
import "./Section.less";

const {
  VaryValue,
} = window.$fd;


export default function Section(props, context){
  let $contentWrap = VaryValue('div');
  let $isRotate = VaryValue($contentWrap, (vv)=>{
    let v = vv.value;
    if (!!v) { return ''; }
    
    return 'rolate';
  });
  let showFn = ()=>{
    // $contentWrap.value = !$contentWrap.value
    $contentWrap.set((pre,preTrim)=>{
      console.log( pre, preT );
      // return 'span';
    })
  }
  
  // context.onMounted((...args)=>{
  //   console.log( 'onMouted', args );
  // })
  
  return (
    <section class={['part_Section', props.class??'']}>
      <h1 class="ps_header" onClick={showFn}>
        <div class="ps_lft"> {props.title} </div>
        <div class={["ps_rit", $isRotate]}> ▼ </div>
      </h1>
      <$contentWrap class={['ps_wrap']}>
        { props.children }
      </$contentWrap>
      
    </section>
  );
}


