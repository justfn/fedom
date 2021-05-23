
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
    ContentWrap$.set((pre, preTrim)=>{
      // console.log( pre, preTrim );
      let result = pre ? null : 'section';
      console.log( result );
      return result; 
      // return 'span';
    })
  }
  
  
  return (
    <section className={['part_Section', props.class??'']}>
      <h1 className="ps_header" onClick={showFn}>
        <div className="ps_lft"> {props.title} </div>
        <div className={["ps_rit", isRotate$]}> ▼ </div>
      </h1>
      <ContentWrap$ className={['ps_wrap']}>
        { props.children }
      </ContentWrap$>
      
    </section>
  );
}


