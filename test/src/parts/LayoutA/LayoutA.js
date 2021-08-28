
import FloatCatalog from "../FloatCatalog/FloatCatalog.js";



export default class LayoutA {
  constructor(props){ 
    this.props = props;
  }
  
  render(){
    
    let klass = this.props.className ?? [];
    return (
      <section data-flg="LayoutA" className={['LayoutA', klass]}>
        { this.props.children }
        
        <FloatCatalog />
      </section>
    );
  }
}


