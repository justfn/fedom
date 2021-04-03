import PageB from "../../../parts/PageB/PageB.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  Component,
} = window.$fd;

export default class Page extends PageB {
  constructor(props){
    super(props);
    
    this.mousePosition = trackMouse(document.body);
  }
  
  
  render(){
    return super.render(
      <section class="upLogic">
        <div>
          <span>坐标X:</span>
          <span>{ this.mousePosition.x }</span>
        </div>
        <div>
          <span>坐标Y:</span>
          <span>{ this.mousePosition.y }</span>
        </div>
      </section>
    );
  };
}
