
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";



export default function LayoutA(props, context){
  
  let klass = props.class ?? [];
  
  
  return (
    <section class={['PageA', klass]}>
      { props.children }
      
      <FloatCatalog />
    </section>
  );
}

