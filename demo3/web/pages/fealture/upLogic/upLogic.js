import PageA from "../../../parts/PageA/PageA.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  Component,
} = window.$fd;

export default class Pageaa extends Component {
  constructor(props){
    super(props);
    
    this.mousePosition = trackMouse(document.body);
  }
  
  
  render(){
    
    
    return (
      <PageA class="upLogic">
        <div>
          <span>坐标X:</span>
          <span>{ this.mousePosition.x }</span>
        </div>
        <div>
          <span>坐标Y:</span>
          <span>{ this.mousePosition.y }</span>
        </div>
      </PageA>
    );
  };
}
