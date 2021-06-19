

import FloatCatalog from "../FloatCatalog/FloatCatalog.js";


const {
  Component, 
} = window.$fd;




export default function (ComponentTarget){
  
  return class Child extends ComponentTarget {
    constructor(...args){
      super(...args)
    }
    
    render(){
      return (
        <section className={['PageB']}>
          { super.render() }
          
          <FloatCatalog />
        </section>
  
      );
    }
  }
} 


