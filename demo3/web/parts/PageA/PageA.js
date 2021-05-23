
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";



export default function PageA(props, context){
  
  let klass = props.className ?? [];
  
  
  // console.log( 'props.children', props.children );
  
  return (
    <section className={['PageA', ...klass]}>
      { props.children }
      
      <FloatCatalog />
    </section>
  );
}

