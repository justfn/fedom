
import "./Section.less";

const {
  VaryValue,
} = window.$fd;


export default function Section(props, context){
  let ContentWrap$ = VaryValue('div');
  let isRotate$ = VaryValue(ContentWrap$, (vv)=>{
    let v = vv.$$;
    if (!!v) { return ''; }
    
    return 'rolate';
  });
  let showFn = ()=>{
    // ContentWrap$.$$ = !ContentWrap$.$$
    ContentWrap$.$set((pre, preTrim)=>{
      // console.log( pre, preTrim );
      let result = pre ? null : 'section';
      console.log( result );
      return result; 
      // return 'span';
    })
  }
  
  
  return (
    <section class={['part_Section', props.class??'']}>
      <h1 class="ps_header" onClick={showFn}>
        <div class="ps_lft"> {props.title} </div>
        <div class={["ps_rit", isRotate$]}> ▼ </div>
      </h1>
      <ContentWrap$ class={['ps_wrap']}>
        { props.children }
      </ContentWrap$>
      
    </section>
  );
}


