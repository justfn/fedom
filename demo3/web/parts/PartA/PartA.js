

export default function (props, context){
  context.onUnmount = (...args)=>{
    console.log(' PartA unmount ' , args);
    
    context.methods = {
      alert(){
        console.log('partA alert!')
      }
    }
    
    setTimeout(()=>{
      console.log(' PartA unmounted ' , args);
      
    },1000)
  }
  
  return (
    <div>  
      <br />
      ========== 
      <br />
      { props.children }
    </div>
  );
} 