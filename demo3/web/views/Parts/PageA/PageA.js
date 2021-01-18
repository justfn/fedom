
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";



export default function PageA(props, context){
  
  
  
  
  return (
    <section class="PageA">
      { props.children }
      
      <FloatCatalog />
    </section>
  );
}

