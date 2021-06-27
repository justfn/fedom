
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";



export default function LayoutA(props, context){
  
  let klass = props.className ?? [];
  
  
  return (
    <section className={['LayoutA', klass]}>
      { props.children }
      
      <FloatCatalog />
    </section>
  );
}

