import LayoutA from "../../Parts/LayoutA/LayoutA.js";
const {
  VaryValue, 
  AsyncValue,
  Store,
} = window.$fd


export default class Home {
  constructor(props){ 
  }
  onUnmount(){
    console.log( 'home onUnmount' );
    
  }
  
  render(){
    setTimeout(()=>{
      console.log( 'home mounted ' );
    })
    return (
      <LayoutA 
        >
        首页 
      </LayoutA>
    );
  }
}




