import "./upLogic.less";
import PageB from "../../../parts/PageB/PageB.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  Component,
} = window.$fd;

export default class Page extends PageB {
  constructor(props){
    super(props);
    
  }
  
  
  render(){
    let { x, y } = trackMouse(document.body);
    x.watch((...args)=>{
      console.log( 'watch:', args);
    })
    return (
      <section class="upLogic">
        <div>
          <span>坐标X:</span>
          <span>{ x }</span>
        </div>
        <div>
          <span>坐标Y:</span>
          <span>{ y }</span>
        </div>
      </section>
    )
  };
}


