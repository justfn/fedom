

import FloatCatalog from "../FloatCatalog/FloatCatalog.js";


const {
  Component, 
} = window.$fd;


export default class PageB extends Component {
  constructor(props){
    super(props)
  }
  
  // render
  
  render( children  ){
    return (
      <section class={['PageB']}>
        { children }
        
        <FloatCatalog />
      </section>

    );
  }
}

