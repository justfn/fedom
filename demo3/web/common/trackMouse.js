
const {
  VaryValue, 
} = window.$fd;


export default function(elem){
  let x = VaryValue(0);
  let y = VaryValue(0);
  
  let mousemoveHandler = function(evt){
    x.$$ = Math.round( evt.clientX/elem.clientWidth * 100 ); 
    y.$$ = Math.round( evt.clientY/elem.clientHeight * 100 ); 
  }
  elem.addEventListener("mousemove", mousemoveHandler)
  
  return {
    x,
    y,
    unBind(){
      elem.removeEventListener("mousemove", mousemoveHandler);
    },
  };
}
