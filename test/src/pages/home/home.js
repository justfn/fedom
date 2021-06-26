import PageA from "../../Parts/PageA/PageA.js";
const {
  VaryValue, 
  VaryKeys,
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
    <PageA 
      >
      首页 
    </PageA>
  );
}



