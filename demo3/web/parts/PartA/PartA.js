

export default function (props, context){
  context.onUnmount( (...args)=>{
    console.log(' PartA unmount ' , args);
    
    
    setTimeout(()=>{
      console.log(' PartA unmounted ' , args);
      
    },1000)
  })
  
  return (
    <div>  )))))))))))))) </div>
  );
} 