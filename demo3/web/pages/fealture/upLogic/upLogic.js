import "./upLogic.less";
import PageB from "../../../parts/PageB/PageB.js";

import trackMouse from "../../../common/trackMouse.js";

const {
  Component,
  VaryValue,
} = window.$fd;

@PageB 
export default class Page extends Component {
  constructor(props){
    super(props);
    this.init();
    console.log(" >>>>>>>>>>>>>> ", 'start')
    
  }
  onShow(){
    console.log(" >>>>>>>>>>>>>> ", 'onShow ')
    this.init();
  }
  onUnmount(){
    console.log('  onUnmount  ');
  }
  
  init(){
    let { x, y } = trackMouse(this);
    this.x = x;
    this.y = y;
    this.x.watch((...args)=>{
      console.log( 'watch x:', args);
    })
  }
  
  
  render(){
    console.log("000000000 x", this.x)
    
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


