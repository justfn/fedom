import "./upLogic.less";
import PageB from "../../../parts/PageB/PageB.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  Component,
} = window.$fd;

export default class Page extends PageB {
  constructor(props){
    super(props);
    
    let { x, y, unBind } = trackMouse(document.body);
    this.x = x;
    this.y = y;
    this.x.watch((...args)=>{
      console.log( 'watch:', args);
    })
    this.unBind = unBind;
  }
  
  onUnmount(){
    this.unBind();
  }
  
  
  render(){
    return (
      <section class="upLogic">
        <div>
          <span>坐标X:</span>
          <span>{ this.x }</span>
        </div>
        <div>
          <span>坐标Y:</span>
          <span>{ this.y }</span>
        </div>
      </section>
    )
  };
}


