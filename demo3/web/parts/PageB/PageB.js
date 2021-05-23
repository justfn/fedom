

import FloatCatalog from "../FloatCatalog/FloatCatalog.js";


const {
  Component, 
} = window.$fd;


export default class PageB extends Component {
  constructor(props){
    super(props)
  }
  
  render_(){
    return (
      <section className={['PageB']}>
        { this.render() }
        
        <FloatCatalog />
      </section>

    );
  }
}

