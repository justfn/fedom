


function pageA(props,context){
  props.xx.watch(()=>{
    
  })
  
  context.onUnmount = ()=>{ 
    console.log( 'pagea unmount');
    setTimeout(()=>{
      console.log( 'pagea unmounted');
    })
  }
  
  return (
    <div class="PageA">
    
    </div>
  );
} 

export default pageA;


