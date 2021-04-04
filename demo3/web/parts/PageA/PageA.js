
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";



export default function PageA(props, context){
  
  let klass = props.class ?? [];
  
  
  // console.log( 'props.children', props.children );
  
  return (
    <section class={['PageA', ...klass]}>
      { props.children }
      
      <FloatCatalog />
    </section>
  );
}

