import LayoutA from "../../Parts/LayoutA/LayoutA.js";
const {
  VaryValue, 
  AsyncValue,
  Store,
} = window.$fd


export default function(props, context){
  setTimeout(()=>{
    console.log( 'home mounted ' );
  })
  context.onUnmount = ()=>{
    console.log( 'home onUnmount' );
  }
  
  return (
    <LayoutA 
      >
      首页 
    </LayoutA>
  );
}



