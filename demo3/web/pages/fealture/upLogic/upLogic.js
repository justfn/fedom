import "./upLogic.less";
import PageB from "../../../parts/PageB/PageB.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  Component,
} = window.$fd;

export default class Page extends PageB {
  constructor(props){
    super(props);
    this.init();
    console.log(" >>>>>>>>>>>>>> ", 'start')
  }
  onShow(){
    console.log(" >>>>>>>>>>>>>> ", 'onShow ')
    console.log('todo onShow');
    this.init();
  }
  onUnmount(){
    console.log('  onUnmount  ');
  }
  
  init(){
    console.log(' 000 ');
    this.root.then((rootEl)=>{
      let { x, y } = trackMouse(rootEl, this);
      this.x = x;
      this.y = y;
      this.x.watch((...args)=>{
        console.log( 'watch:', args);
      })
    })
  }
  
  
  render(){
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


