
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";


export default function (ComponentTarget){
  
  return class Child extends ComponentTarget {
    constructor(...args){
      super(...args)
    }
    
    render(props){
      return (
        <section className={['PageA']}>
          { super.render(props) }
          
          <FloatCatalog />
        </section>
  
      );
    }
  }
} 


