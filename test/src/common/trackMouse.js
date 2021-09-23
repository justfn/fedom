
const {
  VaryValue, 
} = window.$fd;

const {
  onMounted,
  onShow,
  onUnmount, 
} = $fd;

export default function(context){
  
  let x = VaryValue(0);
  let y = VaryValue(0);
  
  onMounted(context, (elem)=>{
    console.log(' from trackMouse mounted ');
    let mousemoveHandler = (evt)=>{
      x.$$ = Math.round( evt.clientX/elem.clientWidth * 100 ); 
      y.$$ = Math.round( evt.clientY/elem.clientHeight * 100 ); 
    }
    elem.addEventListener("mousemove", mousemoveHandler);
    onUnmount(context, ()=>{
      elem.removeEventListener("mousemove", mousemoveHandler);
    });
  })
  onShow(context, (elem)=>{
    console.log(' from trackMouse show ');
    let mousemoveHandler = (evt)=>{
      x.$$ = Math.round( evt.clientX/elem.clientWidth * 100 ); 
      y.$$ = Math.round( evt.clientY/elem.clientHeight * 100 ); 
    }
    elem.addEventListener("mousemove", mousemoveHandler);
    onUnmount(context, ()=>{
      elem.removeEventListener("mousemove", mousemoveHandler);
    });
  })
  
  
  return {
    x,
    y,
  };
}
