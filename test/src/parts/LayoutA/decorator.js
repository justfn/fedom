
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";


export default function (ComponentTarget){
  
  return class Child extends ComponentTarget {
    constructor(...args){
      super(...args)
    }
    
    render(){
      return (
        <section className={['PageA']}>
          { super.render() }
          
          <FloatCatalog />
        </section>
  
      );
    }
  }
} 


