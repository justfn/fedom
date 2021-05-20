
const {
  VaryValue, 
} = window.$fd;

const {
  onUnmount, 
} = $fd;

export default function(elem, context){
  
  let x = VaryValue(0);
  let y = VaryValue(0);
  
  let mousemoveHandler = function(evt){
    x.$$ = Math.round( evt.clientX/elem.clientWidth * 100 ); 
    y.$$ = Math.round( evt.clientY/elem.clientHeight * 100 ); 
  }
  elem.addEventListener("mousemove", mousemoveHandler);
  onUnmount(context, ()=>{
    elem.removeEventListener("mousemove", mousemoveHandler);
  });
  
  return {
    x,
    y,
  };
}
