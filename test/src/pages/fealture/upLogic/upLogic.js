import "./upLogic.less";
import decoratorOfLayoutA from "../../../parts/LayoutA/decorator.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  VaryValue,
} = window.$fd;

@decoratorOfLayoutA 
export default class Page {
  constructor(props){
    
  }
  onCreated(){
    this.init();
  }
  onShow(){
    console.log(" >>>>>>>>>>>>>> ", 'onShow ')
  }
  onUnmount(){
    console.log('  onUnmount  ');
  }
  
  init(){
    let { x, y } = trackMouse(this);
    this.x = x;
    this.y = y;
  }
  
  
  render(){
    console.log(" >>>>>>>>>>>>>> ", 'start')
    console.log("000000000 x", this.x)
    // this.x.watch((...args)=>{
    //   console.log( 'watch x:', args);
    // })
    
    return (
      <section className="upLogic" >
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


