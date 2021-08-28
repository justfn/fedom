

export default class PartA {
  constructor(props){ 
  }
  
  onUnmount = (...args)=>{
    console.log(' PartA unmount ' , args);
    
    
    
    setTimeout(()=>{
      console.log(' PartA unmounted ' , args);
      
    },1000)
  }
  
  methods = {
    alert(){
      console.log('partA alert!')
    }
  }

  render(props){
    
    return (
      <div>  
        <br />
        1 ========== 
        <br />
        2 { props.children }
      </div>
    );
  } 
}
